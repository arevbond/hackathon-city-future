package main

import (
	"github.com/jmoiron/sqlx"
	"net"
	"net/http"
	"strconv"
)

type Server struct {
	*http.Server
	db *sqlx.DB
}

func NewServer(cfg CfgServer, db *sqlx.DB) *Server {
	addr := net.JoinHostPort(cfg.Host, strconv.Itoa(cfg.Port))
	s := &Server{
		Server: &http.Server{
			Addr: addr,
		},
		db: db,
	}

	s.Handler = s.routes()

	return s
}
