package middlewares

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/4shb0rne/Linkhed-In_BackEnd/api/auth"
	"github.com/4shb0rne/Linkhed-In_BackEnd/api/responses"
)

func SetMiddlewareJSON(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		next(w, r)
	}
}

func SetMiddlewareAuthentication(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := auth.TokenValid(r)
		if err != nil {
			fmt.Print("AUTH FAILED")
			responses.ERROR(w, http.StatusUnauthorized, errors.New("Unauthorized"))
			return
		}
		next(w, r)
	}
}
