package main

import (
	"log/slog"
	"net"
	"net/http"
	"strconv"
)

type Server struct {
	*http.Server
	db     *Storage
	logger *slog.Logger
}

func NewServer(cfg CfgServer, db *Storage, log *slog.Logger) *Server {
	addr := net.JoinHostPort(cfg.Host, strconv.Itoa(cfg.Port))
	s := &Server{
		Server: &http.Server{
			Addr: addr,
		},
		db:     db,
		logger: log,
	}

	s.Handler = s.routes()

	return s
}
