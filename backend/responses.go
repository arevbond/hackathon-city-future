package main

// envelope используется для обёртки ответов в единую структуру
type envelope map[string]interface{}

// PongResponse возвращается эндпоинтом /ping
type PongResponse struct {
	Message string `json:"message"`
}

// HealthResponse возвращается эндпоинтом /health
type HealthResponse struct {
	Status string `json:"status"`
}

// RequestListResponse возвращается эндпоинтом /requests
type RequestListResponse struct {
	Requests []Request `json:"requests"`
}

// RequestResponse возвращается эндпоинтом /request/{id}
type RequestResponse struct {
	Request Request `json:"request"`
}

// CreateRequestResponse возвращается после создания запроса
type CreateRequestResponse struct {
	ID     int    `json:"id"`
	Status string `json:"status"`
}

// LoginRequest описывает структуру запроса на авторизацию
type LoginRequest struct {
	Email    string `json:"email" example:"test@example.com"`
	Password string `json:"password" example:"password123"`
}

// LoginResponse описывает структуру ответа после успешной авторизации
type LoginResponse struct {
	Token string `json:"token" example:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`
	User  User   `json:"user"`
}

// AssignTechRequest представляет запрос на назначение технического специалиста
type AssignTechRequest struct {
	TechUserID int `json:"tech_user_id" example:"123"`
}

// SuccessResponse представляет успешный ответ
type SuccessResponse struct {
	Success string `json:"success" example:"true"`
}

// CreateTechReportResponse представляет ответ при создании технического отчета
type CreateTechReportResponse struct {
	ID int `json:"id" example:"456"`
}

// CreateCommentResponse представляет ответ при создании комментария
type CreateCommentResponse struct {
	ID int `json:"id" example:"789"`
}

type ErrorResponse struct {
	Error string `json:"error" example:"invalid request format"` // Описание ошибки
}
