// @title           My Hackathon API
// @version         1.0
// @description     Simple API for hackathon project
// @host            localhost:8080
// @BasePath        /
package main

import (
	"github.com/lmittmann/tint"
	"log"
	"log/slog"
	"os"
	"time"
)

func main() {
	cfg, err := NewConfig()
	if err != nil {
		log.Fatal()
	}

	conn, err := NewConn(cfg.Storage)
	if err != nil {
		log.Fatal(err)
	}

	logger := setupPrettyLogger()

	db := NewStorage(conn, logger)
	srv := NewServer(cfg.Server, db, logger)

	logger.Debug("cfg", slog.Any("cfg", cfg))
	logger.Info("server started")

	if err = srv.Srv.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

func setupPrettyLogger() *slog.Logger {
	logger := slog.New(tint.NewHandler(os.Stdout, &tint.Options{
		AddSource:   false,
		Level:       slog.LevelDebug,
		ReplaceAttr: nil,
		TimeFormat:  time.Kitchen,
		NoColor:     false,
	}))

	return logger
}
