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

// RefreshTokenMiddleware автоматически обновляет access/refresh токены при истечении срока действия access токена.
func (s *Server) RefreshTokenMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Проверяем наличие заголовка "Authorization: Bearer <token>".
		authHeader := r.Header.Get("Authorization")
		if !strings.HasPrefix(authHeader, "Bearer ") {
			// Если токен доступа не указан - пропускаем запрос дальше,
			// может авторизация и не нужна, другие middleware разберутся.
			next.ServeHTTP(w, r)
			return
		}

		// Достаём токен доступа из заголовка, обрезая "Bearer".
		accessToken := strings.TrimPrefix(authHeader, "Bearer ")

		// Проверяем валидность токена доступа.
		userID, err := s.ParseJWT(accessToken)
		if err == nil {
			// Если токен доступа валидный - пропускаем запрос дальше,
			// обновление токенов не требуется.
			next.ServeHTTP(w, r)
			return
		}

		// Достаём токен обновления из cookie.
		refreshTokenCookie, err := r.Cookie("refreshToken")
		if err != nil {
			s.unauthorizedResponse(w, r)
			return
		}

		refreshToken := refreshTokenCookie.Value

		// Проверяем валидность токена обновления.
		userID, err = s.ParseJWT(refreshToken)
		if err != nil {
			s.unauthorizedResponse(w, r)
			return
		}

		// Генерируем новые токены.
		accessToken, err = s.GenerateAccessToken(userID)
		if err != nil {
			s.unauthorizedResponse(w, r)
			return
		}

		refreshToken, err = s.GenerateRefreshToken(userID)
		if err != nil {
			s.unauthorizedResponse(w, r)
			return
		}

		// Возвращаем новые токены с будущим ответом.
		cookie := s.GenerateRefreshTokenCookie(refreshToken)
		http.SetCookie(w, &cookie)

		w.Header().Set("X-Access-Token", accessToken)
		// Не кэшируем этот ответ, чтобы фронтенду не отдавался
		// старый токен с каждым аналогичным запросом из-за
		// закэшированного "X-Access-Token".
		w.Header().Set("Cache-Control", "no-store")

		// Подменяем токен в запросе, чтобы оставшиеся middleware
		// получили уже новый.
		r.Header.Set("Authorization", "Bearer "+accessToken)

		next.ServeHTTP(w, r)
	})
}

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
		userID, err := s.ParseJWT(tokenString)
		if err != nil {
			s.unauthorizedResponse(w, r)
			return
		}

		user, err := s.db.UserById(r.Context(), userID)
		if err != nil {
			s.unauthorizedResponse(w, r)
			return
		}

		// Кладём userID и роль в контекст
		ctx := context.WithValue(r.Context(), contextKeyUserID, userID)
		ctx = context.WithValue(ctx, contextKeyRole, user.Role)

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

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Обработка preflight запросов
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
