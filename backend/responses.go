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
