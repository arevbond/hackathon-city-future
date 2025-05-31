package main

import (
	"database/sql"
	"time"
)

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
	TechUserID  *int          `db:"tech_user_id" json:"tech_user_id,omitempty"`
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

type UserRole string

const (
	UserWithoutRole UserRole = ""
	UserManager     UserRole = "manager"
	UserTech        UserRole = "tech"
	UserClient      UserRole = "client"
)

type User struct {
	ID           int      `db:"id" json:"id"`
	Name         string   `db:"name" json:"name"`
	Role         UserRole `db:"role" json:"role"`
	Email        string   `db:"email" json:"email"`
	HashPassword string   `db:"hash_password" json:"-"`
}

// Структура для результата запроса (flat структура для sqlx)
type TechReportWithComment struct {
	// Поля tech_report
	ReportID        int           `db:"report_id"`
	RequestID       int           `db:"request_id"`
	TechUserID      sql.NullInt64 `db:"tech_user_id"`
	Report          string        `db:"report"`
	ReportCreatedAt time.Time     `db:"report_created_at"`

	// Поля comment (могут быть null при LEFT JOIN)
	CommentID        sql.NullInt64  `db:"comment_id"`
	CommentUserID    sql.NullInt64  `db:"comment_user_id"`
	CommentContent   sql.NullString `db:"comment_content"`
	CommentCreatedAt sql.NullTime   `db:"comment_created_at"`
}

// Вспомогательные структуры для финального результата
type Comment struct {
	ID        int       `json:"id"`
	UserID    *int      `json:"user_id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}

type TechReport struct {
	ID         int       `json:"id"`
	RequestID  int       `json:"request_id"`
	TechUserID *int      `json:"tech_user_id"`
	Report     string    `json:"report"`
	CreatedAt  time.Time `json:"created_at"`
	Comments   []Comment `json:"comments"`
}
