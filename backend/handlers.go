package main

import (
	"encoding/json"
	_ "github.com/arevbond/hackathon-city-future/backend/docs"
	httpSwagger "github.com/swaggo/http-swagger"
	"net/http"
)

func (s *Server) routes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/ping", s.handlePing)
	mux.Handle("/swagger/", httpSwagger.WrapHandler)

	return mux
}

// handlePing godoc
// @Summary      Проверка доступности API
// @Description  Возвращает "pong" при GET-запросе
// @Tags         health
// @Produce      json
// @Success      200  {object}  map[string]string
// @Router       /api/ping [get]
func (s *Server) handlePing(w http.ResponseWriter, r *http.Request) {
	resp := map[string]string{"message": "pong"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}
