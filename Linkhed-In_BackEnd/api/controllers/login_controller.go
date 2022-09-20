package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/4shb0rne/Linkhed-In_BackEnd/api/auth"
	"github.com/4shb0rne/Linkhed-In_BackEnd/api/models"
	"github.com/4shb0rne/Linkhed-In_BackEnd/api/responses"
	"github.com/4shb0rne/Linkhed-In_BackEnd/api/utils/formaterror"
	"golang.org/x/crypto/bcrypt"
)

func (server *Server) Login(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	user := models.User{}
	fmt.Print(r)
	err = json.Unmarshal(body, &user)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	user.Prepare()
	err = user.Validate("login")
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	token, err := server.SignIn(user.Email, user.Password)
	if err != nil {
		formattedError := formaterror.FormatError(err.Error())
		responses.ERROR(w, http.StatusUnprocessableEntity, formattedError)
		return
	}
	expiration := time.Now().Add(5 * time.Hour)
	cookie := &http.Cookie{Name: "token", Value: token, Expires: expiration}
	http.SetCookie(w, cookie)
	responses.JSON(w, http.StatusOK, token)
}

func (server *Server) SignIn(email, password string) (string, error) {

	var err error

	user := models.User{}

	err = server.DB.Debug().Model(models.User{}).Where("email = ?", email).Take(&user).Error
	if err != nil {
		return "", err
	}
	err = models.VerifyPassword(user.Password, password)
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		return "", err
	}
	if(user.Verified == false){
		return "", err
	}
	return auth.CreateToken(user.ID)
}

func (server *Server) GoogleLogin(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	user := models.User{}
	err = json.Unmarshal(body, &user)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	token, err := server.GoogleSignIn(user.Email)
	if err != nil {
		formattedError := formaterror.FormatError(err.Error())
		responses.ERROR(w, http.StatusUnprocessableEntity, formattedError)
		return
	}
	expiration := time.Now().Add(5 * time.Hour)
	cookie := &http.Cookie{Name: "token", Value: token, Expires: expiration}
	http.SetCookie(w, cookie)
	responses.JSON(w, http.StatusOK, token)
}

func (server *Server) GoogleSignIn(email string) (string, error) {
	var err error
	user := models.User{}
	err = server.DB.Debug().Model(models.User{}).Where("email = ?", email).Take(&user).Error
	if err != nil {
		return "", err
	}
	return auth.CreateToken(user.ID)
} 

func (server *Server) GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	user_id, err := auth.ExtractTokenID(r)

	if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		return
	}
	user := models.User{}
	u, err := user.FindUserByID(server.DB, user_id)

	if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		return
	}
	responses.JSON(w, http.StatusOK, u)
}
