package main

import (
	"net"
	"net/http"
	"strconv"
)

type Server struct {
	*http.Server
	db *Storage
}

func NewServer(cfg CfgServer, db *Storage) *Server {
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
