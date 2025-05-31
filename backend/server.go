package main

import (
	"log/slog"
	"net"
	"net/http"
	"strconv"
)

type Server struct {
	Srv       *http.Server
	db        *Storage
	logger    *slog.Logger
	jwtSecret string
}

func NewServer(cfg CfgServer, db *Storage, log *slog.Logger) *Server {
	addr := net.JoinHostPort(cfg.Host, strconv.Itoa(cfg.Port))
	s := &Server{
		Srv: &http.Server{
			Addr: addr,
		},
		db:        db,
		logger:    log,
		jwtSecret: cfg.JwtSecret,
	}

	s.Srv.Handler = s.routes()

	return s
}
