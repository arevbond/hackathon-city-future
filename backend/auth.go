package main

import (
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"time"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func (s *Server) GenerateJWT(userID int, duration time.Duration) (string, error) {
	claims := jwt.MapClaims{
		"sub": userID, // subject = user ID
		"exp": time.Now().Add(duration).Unix(),
		"iat": time.Now().Unix(), // issued at
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte(s.jwtSecret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (s *Server) GenerateAccessToken(userID int) (string, error) {
	return s.GenerateJWT(userID, 15*time.Minute)
}

func (s *Server) GenerateRefreshToken(userID int) (string, error) {
	return s.GenerateJWT(userID, 7*24*time.Hour)
}

// ParseJWT парсит и валидирует JWT-токен.
func (s *Server) ParseJWT(tokenString string) (int, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Проверяем метод подписи
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(s.jwtSecret), nil
	})

	if err != nil {
		return 0, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return 0, errors.New("invalid token")
	}

	// Извлекаем userID
	userIDFloat, ok := claims["sub"].(float64)
	if !ok {
		return 0, errors.New("invalid token: sub claim missing or invalid")
	}
	userID := int(userIDFloat)

	return userID, nil
}
