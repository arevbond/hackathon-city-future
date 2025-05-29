package main

import (
	"fmt"
	"log/slog"
	"net"
	"strconv"

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
