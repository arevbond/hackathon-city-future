package main

import (
	"context"
	"fmt"
	"log/slog"
	"net"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
	"github.com/jmoiron/sqlx"
)

type Storage struct {
	db  *sqlx.DB
	log *slog.Logger
}

func NewStorage(db *sqlx.DB, log *slog.Logger) *Storage {
	return &Storage{db: db}
}

func NewConn(cfg CfgPostgres) (*sqlx.DB, error) {
	hostWithPort := net.JoinHostPort(cfg.Host, strconv.Itoa(cfg.Port))
	uri := fmt.Sprintf("postgresql://%s:%s@%s/%s", cfg.User, cfg.Password,
		hostWithPort, cfg.DatabaseName)
	connStr, err := pgx.ParseConfig(uri)

	if err != nil {
		return nil, fmt.Errorf("can't parse pg uri: %w", err)
	}

	pgxdb := stdlib.OpenDB(*connStr)

	if err = pgxdb.Ping(); err != nil {
		return nil, fmt.Errorf("can't ping db: %w", err)
	}

	return sqlx.NewDb(pgxdb, "pgx"), nil
}

func (s *Storage) CreateRequest(ctx context.Context, request CreateRequest) (int, error) {
	query := `INSERT INTO requests (client_name, client_email, title, description, created_at, updated_at)
				VALUES ($1, $2, $3, $4, $5, $6)
				RETURNING id;`

	args := []any{request.ClientName, request.ClientEmail, request.Title, request.Description, time.Now(), time.Now()}

	var id int

	row := s.db.QueryRowContext(ctx, query, args...)
	if err := row.Scan(&id); err != nil {
		return -1, fmt.Errorf("can't create new request: %w", err)
	}

	if err := row.Err(); err != nil {
		return -1, fmt.Errorf("err while processing output: %w", err)
	}

	return id, nil
}

func (s *Storage) Requests(ctx context.Context, status RequestStatus) ([]*Request, error) {
	var query string
	var args []any
	if status != RequestWithoutStatus {
		query = `SELECT id, client_name, client_email, title, description, status, created_at, updated_at
			FROM requests
			WHERE status = $1;`
		args = []any{status}
	} else {
		query = `SELECT id, client_name, client_email, title, description, status, created_at, updated_at
		FROM requests;`
	}

	requests := []*Request{}

	err := s.db.SelectContext(ctx, &requests, query, args...)
	if err != nil {
		return nil, fmt.Errorf("can't get requests from db: %w", err)
	}

	return requests, nil
}

func (s *Storage) Request(ctx context.Context, id int) (*Request, error) {
	query := `SELECT id, client_name, client_email, tech_user_id, title, description, status, created_at, updated_at
			FROM requests
			WHERE id = $1;`

	var request Request

	if err := s.db.GetContext(ctx, &request, query, id); err != nil {
		return nil, fmt.Errorf("can't get request, from db: %w", err)
	}

	return &request, nil
}

func (s *Storage) User(ctx context.Context, email string) (*User, error) {
	query := `SELECT id, name, role, email, hash_password
				FROM users
				WHERE email = $1;`

	var user User

	if err := s.db.GetContext(ctx, &user, query, email); err != nil {
		return nil, fmt.Errorf("can't get user from db: %w", err)
	}

	return &user, nil
}

func (s *Storage) AssignTechToRequest(ctx context.Context, requestID int, techID int) error {
	query := `UPDATE requests
             SET tech_user_id = $1
             WHERE id = $2;`

	result, err := s.db.ExecContext(ctx, query, techID, requestID)
	if err != nil {
		return fmt.Errorf("can't assign tech to request: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("can't get rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("request with id %d not found", requestID)
	}

	return nil
}

func (s *Storage) CreateTechReport(ctx context.Context, createReport CreateTechReportRequest) (int, error) {
	query := `INSERT INTO tech_reports (request_id, tech_user_id, report)
				VALUES ($1, $2 ,$3)
				RETURNING id;`

	args := []any{createReport.RequestID, createReport.TechUserID, createReport.Report}

	var reportID int

	row := s.db.QueryRowContext(ctx, query, args...)
	if err := row.Scan(&reportID); err != nil {
		return -1, fmt.Errorf("can't create new tech report: %w", err)
	}

	if err := row.Err(); err != nil {
		return -1, fmt.Errorf("err while processing output from tech report: %w", err)
	}

	return reportID, nil
}

func (s *Storage) UpdateStatusRequest(ctx context.Context, id int, status string) error {
	query := `UPDATE requests
				SET status = $1
				WHERE id = $2;`

	result, err := s.db.ExecContext(ctx, query, status, id)
	if err != nil {
		return fmt.Errorf("can't assign tech to request: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("can't get rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("request with id %d not found", id)
	}

	return nil
}

func (s *Storage) CreateComment(ctx context.Context, reportID int, userID int, content string) (int, error) {
	query := `INSERT INTO comments (tech_report_id, user_id, content)
				VALUES ($1, $2, $3)
				RETURNING id;`

	args := []any{reportID, userID, content}

	var commentID int

	row := s.db.QueryRowContext(ctx, query, args...)
	if err := row.Scan(&commentID); err != nil {
		return -1, fmt.Errorf("can't create new comment: %w", err)
	}

	if err := row.Err(); err != nil {
		return -1, fmt.Errorf("err while processing output from tech report: %w", err)
	}

	return commentID, nil
}
