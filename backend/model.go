package main

import "time"

type RequestStatus string

const (
	RequestWithoutStatus RequestStatus = ""
	RequestNew                         = "new"
	RequestInProgress                  = "in_progress"
	RequestCompleted                   = "completed"
)

func ConvertStatus(status string) RequestStatus {
	switch status {
	case RequestNew:
		return RequestNew
	case RequestInProgress:
		return RequestInProgress
	case RequestCompleted:
		return RequestCompleted
	}

	return RequestWithoutStatus
}

type Request struct {
	ID          int           `db:"id" json:"id"`
	ClientName  string        `db:"client_name" json:"client_name"`
	ClientEmail string        `db:"client_email" json:"client_email"`
	Title       string        `db:"title" json:"title"`
	Description string        `db:"description" json:"description"`
	Status      RequestStatus `db:"status" json:"status"`
	CreateAt    time.Time     `db:"created_at" json:"create_at"`
	UpdatedAt   time.Time     `db:"updated_at" json:"updated_at"`
}

type CreateRequest struct {
	ClientName  string `db:"client_name" json:"client_name"`
	ClientEmail string `db:"client_email" json:"client_email"`
	Title       string `db:"title" json:"title"`
	Description string `db:"description" json:"description"`
}
