package controllers

import (
	"net/http"

	"github.com/4shb0rne/Linkhed-In_BackEnd/api/responses"
)

func (server *Server) Home(w http.ResponseWriter, r *http.Request) {
	responses.JSON(w, http.StatusOK, "TEST")
}
