package main

import (
	"context"
	"net/http"
	"strings"
)

type contextKey string

const (
	contextKeyUserID contextKey = "userID"
	contextKeyRole   contextKey = "userRole"
)

// AuthMiddleware проверяет JWT, достаёт userID и роль, и кладёт их в контекст.
func (s *Server) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Достаём токен из заголовка Authorization: Bearer <token>
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			s.unauthorizedResponse(w, r)
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			s.unauthorizedResponse(w, r)
			return
		}

		tokenString := parts[1]
		userID, role, err := s.ParseJWT(tokenString)
		if err != nil {
			s.unauthorizedResponse(w, r)
			return
		}

		// Кладём userID и роль в контекст
		ctx := context.WithValue(r.Context(), contextKeyUserID, userID)
		ctx = context.WithValue(ctx, contextKeyRole, role)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// RoleMiddleware разрешает доступ только для определённых ролей.
func (s *Server) RoleMiddleware(allowedRoles ...UserRole) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			roleValue := r.Context().Value(contextKeyRole)
			role, ok := roleValue.(UserRole)
			if !ok {
				s.unauthorizedResponse(w, r)
				return
			}

			for _, allowedRole := range allowedRoles {
				if role == allowedRole {
					next.ServeHTTP(w, r)
					return
				}
			}

			s.forbiddenResponse(w, r)
		})
	}
}
