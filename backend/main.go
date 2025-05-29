// @title           My Hackathon API
// @version         1.0
// @description     Simple API for hackathon project
// @host            localhost:8080
// @BasePath        /
package main

import (
	"log"
)

func main() {
	cfg, err := NewConfig()
	if err != nil {
		log.Fatal()
	}

	db, err := NewConn(cfg.Storage)
	if err != nil {
		log.Fatal(err)
	}

	srv := NewServer(cfg.Server, db)

	log.Println("server started")

	if err = srv.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
