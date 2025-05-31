package main

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	Server  CfgServer
	Storage CfgPostgres
}

type CfgServer struct {
	Host      string
	Port      int
	JwtSecret string
}

type CfgPostgres struct {
	Host         string
	Port         int
	User         string
	Password     string
	DatabaseName string
}

func NewConfig() (Config, error) {
	// need for dev mode
	_ = godotenv.Load()

	srvPortString := getEnv("SERVER_PORT", "8080")
	srvPort, err := strconv.Atoi(srvPortString)

	if err != nil {
		return Config{}, fmt.Errorf("can't convert server port to int: %w", err)
	}

	server := CfgServer{
		Host:      getEnv("SERVER_HOST", "0.0.0.0"),
		Port:      srvPort,
		JwtSecret: mustGetEnv("JWT_SECRET"),
	}

	storagePortStr := getEnv("PG_PORT", "5432")
	storagePort, err := strconv.Atoi(storagePortStr)

	if err != nil {
		return Config{}, fmt.Errorf("can't convert storage port to int: %w", err)
	}

	storage := CfgPostgres{
		Host:         getEnv("PG_HOST", "blog-database"),
		Port:         storagePort,
		User:         mustGetEnv("PG_USERNAME"),
		Password:     mustGetEnv("PG_PASSWORD"),
		DatabaseName: mustGetEnv("PG_DBNAME"),
	}

	return Config{
		Server:  server,
		Storage: storage,
	}, nil
}

func getEnv(key, fallback string) string {
	val := os.Getenv(key)
	if val == "" {
		return fallback
	}

	return val
}

func mustGetEnv(key string) string {
	val := os.Getenv(key)
	if val == "" {
		log.Fatalf("required env var %s is not set", key)
	}

	return val
}
