package main

import (
	"database/sql"
	"encoding/json"
	"errors"
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

	// auth
	mux.HandleFunc("POST /login", s.login)

	// requests
	mux.HandleFunc("POST /requests", s.createRequest)
	mux.HandleFunc("GET /requests", s.allRequests)
	mux.HandleFunc("GET /request/{id}", s.requestByID)
	mux.HandleFunc("PUT /requests/{id}/assign-tech", s.assignTechToRequest)
	mux.HandleFunc("PATCH /requests/{id}/status", s.updateStatusRequest)

	// tech-reports
	mux.HandleFunc("POST /tech-report", s.createTechReport)
	mux.HandleFunc("POST /comments", s.createComment)
	//mux.HandleFunc("GET /tech-report", s.getTechReportWithComment)

	return mux
}

// handlePing godoc
// @Summary      Проверка доступности API
// @Description  Возвращает "pong" при GET-запросе
// @Tags         health
// @Produce      json
// @Success      200  {object}  PongResponse
// @Router       /ping [get]
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
// @Router       /health [get]
func (s *Server) healthcheckHandler(w http.ResponseWriter, r *http.Request) {
	env := envelope{
		"status": "available",
	}

	err := s.writeJSON(w, http.StatusOK, env, nil)
	if err != nil {
		s.errorResponse(w, r, http.StatusInternalServerError, err)
	}
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
// @Router       /request [post]
func (s *Server) createRequest(w http.ResponseWriter, r *http.Request) {
	var input CreateRequest

	if err := s.readJSON(w, r, &input); err != nil {
		s.badRequestResponse(w, r, err)
		return
	}

	id, err := s.db.CreateRequest(r.Context(), input)
	if err != nil {
		s.serverErrorResponse(w, r, err)
		return
	}

	if err = s.writeJSON(w, http.StatusCreated, envelope{"id": id, "status": "new"}, nil); err != nil {
		s.serverErrorResponse(w, r, err)
	}
}

// allRequests godoc
// @Summary      Получение списка запросов
// @Description  Возвращает все запросы с фильтром по статусу (опционально)
// @Tags         requests
// @Produce      json
// @Param        status  query     string  false  "Статус запроса"
// @Success      200     {object}  RequestListResponse
// @Failure      500     {object}  map[string]string
// @Router       /requests [get]
func (s *Server) allRequests(w http.ResponseWriter, r *http.Request) {
	status := r.URL.Query().Get("status")

	requests, err := s.db.Requests(r.Context(), ConvertStatus(status))
	if err != nil {
		s.serverErrorResponse(w, r, err)
		return
	}

	if err = s.writeJSON(w, http.StatusOK, envelope{"requests": requests}, nil); err != nil {
		s.serverErrorResponse(w, r, err)
	}
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
// @Router       /request/{id} [get]
func (s *Server) requestByID(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		s.badRequestResponse(w, r, err)
		return
	}

	request, err := s.db.Request(r.Context(), id)
	if err != nil {
		s.serverErrorResponse(w, r, err)
		return
	}

	if err = s.writeJSON(w, http.StatusOK, envelope{"request": request}, nil); err != nil {
		s.serverErrorResponse(w, r, err)
	}
}

// login godoc
// @Summary      Авторизация пользователя
// @Description  Проверяет email и пароль пользователя, возвращает JWT и данные пользователя
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        credentials  body      LoginRequest  true  "Данные для входа"
// @Success      200          {object}  LoginResponse
// @Failure      400          {object}  map[string]string
// @Failure      401          {object}  map[string]string
// @Failure      500          {object}  map[string]string
// @Router       /login [post]
func (s *Server) login(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := s.readJSON(w, r, &input); err != nil {
		s.badRequestResponse(w, r, err)

		return
	}

	user, err := s.db.User(r.Context(), input.Email)
	if errors.Is(err, sql.ErrNoRows) {
		s.unauthorizedResponse(w, r)
	} else if err != nil {
		s.serverErrorResponse(w, r, err)

		return
	}

	if !CheckPasswordHash(input.Password, user.HashPassword) {
		s.unauthorizedResponse(w, r)

		return
	}

	token, err := s.GenerateJWT(user.ID, string(user.Role))
	if err != nil {
		s.serverErrorResponse(w, r, err)

		return
	}

	if err = s.writeJSON(w, http.StatusOK, envelope{"token": token, "user": user}, nil); err != nil {
		s.serverErrorResponse(w, r, err)

		return
	}
}

// assignTechToRequest godoc
// @Summary      Назначение технического специалиста на запрос
// @Description  Назначает технического специалиста для работы с конкретным запросом
// @Tags         requests
// @Accept       json
// @Produce      json
// @Param        id      path      int                    true  "ID запроса"
// @Param        tech    body      AssignTechRequest      true  "ID технического специалиста"
// @Success      200     {object}  SuccessResponse
// @Failure      400     {object}  map[string]string
// @Failure      500     {object}  map[string]string
// @Router       /requests/{id}/assign-tech [put]
func (s *Server) assignTechToRequest(w http.ResponseWriter, r *http.Request) {
	requestIDStr := r.PathValue("id")
	requestID, err := strconv.Atoi(requestIDStr)
	if err != nil {
		s.badRequestResponse(w, r, err)

		return
	}

	var input struct {
		TechUserID int `json:"tech_user_id"`
	}

	if err = s.readJSON(w, r, &input); err != nil {
		s.serverErrorResponse(w, r, err)

		return
	}

	err = s.db.AssignTechToRequest(r.Context(), requestID, input.TechUserID)
	if err != nil {
		s.serverErrorResponse(w, r, err)

		return
	}

	if err = s.writeJSON(w, http.StatusOK, envelope{"success": "true"}, nil); err != nil {
		s.serverErrorResponse(w, r, err)

		return
	}
}

type CreateTechReportRequest struct {
	RequestID  int    `json:"request_id" example:"123"`
	TechUserID int    `json:"tech_user_id" example:"456"`
	Report     string `json:"report" example:"Работы выполнены в полном объеме"`
}

// createTechReport godoc
// @Summary      Создание технического отчета
// @Description  Создает новый технический отчет для выполненного запроса
// @Tags         tech-reports
// @Accept       json
// @Produce      json
// @Param        report  body      CreateTechReportRequest  true  "Данные технического отчета"
// @Success      201     {object}  CreateTechReportResponse
// @Failure      400     {object}  map[string]string
// @Failure      500     {object}  map[string]string
// @Router       /tech-report [post]
func (s *Server) createTechReport(w http.ResponseWriter, r *http.Request) {
	var request CreateTechReportRequest

	if err := s.readJSON(w, r, &request); err != nil {
		s.badRequestResponse(w, r, err)

		return
	}

	reportID, err := s.db.CreateTechReport(r.Context(), request)
	if err != nil {
		s.serverErrorResponse(w, r, err)

		return
	}

	if err = s.writeJSON(w, http.StatusCreated, envelope{"id": reportID}, nil); err != nil {
		s.serverErrorResponse(w, r, err)

		return
	}
}

type UpdateStatusRequest struct {
	Status     string `json:"status"`
	PublicNote string `json:"public_note"`
}

// updateStatusRequest godoc
// @Summary      Обновление статуса запроса
// @Description  Изменяет статус конкретного запроса по его ID
// @Tags         requests
// @Accept       json
// @Produce      json
// @Param        id      path      int                   true  "ID запроса"
// @Param        status  body      UpdateStatusRequest   true  "Новый статус запроса"
// @Success      200     {object}  SuccessResponse
// @Failure      400     {object}  map[string]string
// @Failure      500     {object}  map[string]string
// @Router       /requests/{id}/status [patch]
func (s *Server) updateStatusRequest(w http.ResponseWriter, r *http.Request) {
	var req UpdateStatusRequest

	if err := s.readJSON(w, r, &req); err != nil {
		s.badRequestResponse(w, r, err)

		return
	}

	idStr := r.PathValue("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		s.badRequestResponse(w, r, err)

		return
	}

	if err = s.db.UpdateStatusRequest(r.Context(), id, req.Status); err != nil {
		s.serverErrorResponse(w, r, err)

		return
	}

	if err = s.writeJSON(w, http.StatusOK, SuccessResponse{Success: "true"}, nil); err != nil {
		s.serverErrorResponse(w, r, err)

		return
	}
}

type CreateCommentRequest struct {
	ReportID int    `json:"report_id"`
	UserID   int    `json:"user_id"`
	Content  string `json:"content"`
}

// createComment godoc
// @Summary      Создание комментария
// @Description  Создает новый комментарий к техническому отчету
// @Tags         comments
// @Accept       json
// @Produce      json
// @Param        comment  body      CreateCommentRequest   true  "Данные комментария"
// @Success      201      {object}  CreateCommentResponse
// @Failure      400      {object}  map[string]string
// @Failure      500      {object}  map[string]string
// @Router       /comments [post]
func (s *Server) createComment(w http.ResponseWriter, r *http.Request) {
	var request CreateCommentRequest

	if err := s.readJSON(w, r, &request); err != nil {
		s.badRequestResponse(w, r, err)

		return
	}

	id, err := s.db.CreateComment(r.Context(), request.ReportID, request.UserID, request.Content)
	if err != nil {
		s.serverErrorResponse(w, r, err)

		return
	}

	if err = s.writeJSON(w, http.StatusCreated, CreateCommentResponse{ID: id}, nil); err != nil {
		s.serverErrorResponse(w, r, err)

		return
	}
}

//func (s *Server)
