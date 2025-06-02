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

func (s *Storage) UserByCriteria(ctx context.Context, criteria string, value any) (*User, error) {
	query := `SELECT id, name, role, email, hash_password
				FROM users
				WHERE $1 = $2;`

	var user User

	if err := s.db.GetContext(ctx, &user, query, criteria, value); err != nil {
		return nil, fmt.Errorf("can't get user from db: %w", err)
	}

	return &user, nil
}

func (s *Storage) UserByEmail(ctx context.Context, email string) (*User, error) {
	return s.UserByCriteria(ctx, "email", email)
}

func (s *Storage) UserById(ctx context.Context, id int) (*User, error) {
	return s.UserByCriteria(ctx, "id", id)
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

func convertToTechReports(rows []TechReportWithComment) []TechReport {
	reportMap := make(map[int]*TechReport)

	for _, row := range rows {
		// Создаем или получаем существующий репорт
		if _, exists := reportMap[row.ReportID]; !exists {
			techUserID := (*int)(nil)
			if row.TechUserID.Valid {
				id := int(row.TechUserID.Int64)
				techUserID = &id
			}

			reportMap[row.ReportID] = &TechReport{
				ID:         row.ReportID,
				RequestID:  row.RequestID,
				TechUserID: techUserID,
				Report:     row.Report,
				CreatedAt:  row.ReportCreatedAt,
				Comments:   []Comment{},
			}
		}

		// Добавляем комментарий, если он существует
		if row.CommentID.Valid {
			commentUserID := (*int)(nil)
			if row.CommentUserID.Valid {
				id := int(row.CommentUserID.Int64)
				commentUserID = &id
			}

			comment := Comment{
				ID:        int(row.CommentID.Int64),
				UserID:    commentUserID,
				Content:   row.CommentContent.String,
				CreatedAt: row.CommentCreatedAt.Time,
			}

			reportMap[row.ReportID].Comments = append(reportMap[row.ReportID].Comments, comment)
		}
	}

	// Преобразуем map в slice
	result := make([]TechReport, 0, len(reportMap))
	for _, report := range reportMap {
		result = append(result, *report)
	}

	return result
}

func (s *Storage) GetTechReportsWithComments(ctx context.Context, requestID int) ([]TechReport, error) {
	query := `
        SELECT 
            tr.id as report_id,
            tr.request_id,
            tr.tech_user_id,
            tr.report,
            tr.created_at as report_created_at,
            c.id as comment_id,
            c.user_id as comment_user_id,
            c.content as comment_content,
            c.created_at as comment_created_at
        FROM tech_reports tr
        LEFT JOIN comments c ON tr.id = c.tech_report_id
        WHERE tr.request_id = $1
        ORDER BY tr.created_at ASC, c.created_at ASC;`

	var rows []TechReportWithComment
	err := s.db.Select(&rows, query, requestID)
	if err != nil {
		return nil, err
	}

	return convertToTechReports(rows), nil
}
