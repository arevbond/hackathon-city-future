package main

import (
	"encoding/json"
	_ "github.com/arevbond/hackathon-city-future/backend/docs"
	httpSwagger "github.com/swaggo/http-swagger"
	"net/http"
	"strconv"
)

func (s *Server) routes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /ping", s.handlePing)
	mux.HandleFunc("GET /health", s.healthcheckHandler)
	mux.Handle("/swagger/", httpSwagger.WrapHandler)

	// requests
	mux.HandleFunc("POST /request", s.createRequest)
	mux.HandleFunc("GET /requests", s.allRequests)
	mux.HandleFunc("GET /request/{id}", s.requestByID)

	return mux
}

// handlePing godoc
// @Summary      Проверка доступности API
// @Description  Возвращает "pong" при GET-запросе
// @Tags         health
// @Produce      json
// @Success      200  {object}  PongResponse
// @Router       /api/ping [get]
func (s *Server) handlePing(w http.ResponseWriter, r *http.Request) {
	resp := map[string]string{"message": "pong"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

// healthcheckHandler godoc
// @Summary      Проверка состояния сервера
// @Description  Проверяет, доступен ли сервер
// @Tags         health
// @Produce      json
// @Success      200  {object}  HealthResponse
// @Router       /api/health [get]
func (s *Server) healthcheckHandler(w http.ResponseWriter, r *http.Request) {
	env := envelope{
		"status": "available",
	}
	_ = s.writeJSON(w, http.StatusOK, env, nil)
}

// createRequest godoc
// @Summary      Создание запроса
// @Description  Создаёт новый запрос в системе
// @Tags         requests
// @Accept       json
// @Produce      json
// @Param        request  body      CreateRequest  true  "Данные нового запроса"
// @Success      201      {object}  CreateRequestResponse
// @Failure      400      {object}  map[string]string
// @Failure      500      {object}  map[string]string
// @Router       /api/request [post]
func (s *Server) createRequest(w http.ResponseWriter, r *http.Request) {
	var input CreateRequest
	_ = s.readJSON(w, r, &input)
	id, _ := s.db.CreateRequest(r.Context(), input)
	_ = s.writeJSON(w, http.StatusCreated, envelope{"id": id, "status": "new"}, nil)
}

// allRequests godoc
// @Summary      Получение списка запросов
// @Description  Возвращает все запросы с фильтром по статусу (опционально)
// @Tags         requests
// @Produce      json
// @Param        status  query     string  false  "Статус запроса"
// @Success      200     {object}  RequestListResponse
// @Failure      500     {object}  map[string]string
// @Router       /api/requests [get]
func (s *Server) allRequests(w http.ResponseWriter, r *http.Request) {
	status := r.URL.Query().Get("status")
	requests, _ := s.db.Requests(r.Context(), ConvertStatus(status))
	_ = s.writeJSON(w, http.StatusOK, envelope{"requests": requests}, nil)
}

// requestByID godoc
// @Summary      Получение запроса по ID
// @Description  Возвращает запрос по его идентификатору
// @Tags         requests
// @Produce      json
// @Param        id   path      int  true  "ID запроса"
// @Success      200  {object}  RequestResponse
// @Failure      400  {object}  map[string]string
// @Failure      500  {object}  map[string]string
// @Router       /api/request/{id} [get]
func (s *Server) requestByID(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id")
	id, _ := strconv.Atoi(idStr)
	request, _ := s.db.Request(r.Context(), id)
	_ = s.writeJSON(w, http.StatusOK, envelope{"request": request}, nil)
}
