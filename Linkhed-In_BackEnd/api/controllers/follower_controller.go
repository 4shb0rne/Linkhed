package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/4shb0rne/Linkhed-In_BackEnd/api/models"
	"github.com/4shb0rne/Linkhed-In_BackEnd/api/responses"
	"github.com/4shb0rne/Linkhed-In_BackEnd/api/utils/formaterror"
	"github.com/gorilla/mux"
)

func (server *Server) FollowUser(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	follower := models.Follower{}
	err = json.Unmarshal(body, &follower)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	err = follower.Validate()
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	follow, err := follower.FollowUser(server.DB)
	if err != nil {
		formattedError := formaterror.FormatError(err.Error())
		responses.ERROR(w, http.StatusInternalServerError, formattedError)
		return
	}
	w.Header().Set("Location", fmt.Sprintf("%s%s/%d", r.Host, r.URL.Path, follow.UserID))
	responses.JSON(w, http.StatusCreated, follow)
}

func (server *Server) UnfollowUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	pid, err := strconv.ParseUint(vars["pid"], 10, 64)
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		return
	}
	uid, err := strconv.ParseUint(vars["uid"], 10, 64)
	if err != nil {
		responses.ERROR(w, http.StatusUnauthorized, errors.New("Unauthorized"))
		return
	}
	unfollow := models.Follower{}
	err = server.DB.Debug().Model(models.UserConnections{}).Where("follower_id = ? and user_id = ?", pid, uid).Take(&unfollow).Error
	if err != nil {
		responses.ERROR(w, http.StatusNotFound, errors.New("Unauthorized"))
		return
	}
	_, err = unfollow.UnfollowUser(server.DB, pid, uid)
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		return
	}
	w.Header().Set("Entity", fmt.Sprintf("%d", pid))
	responses.JSON(w, http.StatusNoContent, "DELETED")
}
