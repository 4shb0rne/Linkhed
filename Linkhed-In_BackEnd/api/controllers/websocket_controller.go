package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/4shb0rne/Linkhed-In_BackEnd/api/models"
	"github.com/4shb0rne/Linkhed-In_BackEnd/api/responses"
	"github.com/4shb0rne/Linkhed-In_BackEnd/api/utils/formaterror"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/novalagung/gubrak/v2"
)

type WebSocketConnection struct {
	*websocket.Conn
	Username string
}

type SocketPayload struct {
	Message string
}

type SocketResponse struct {
	From    string
	Type    string
	Message string
}

type M map[string]interface{}

const MESSAGE_NEW_USER = "New User"
const MESSAGE_CHAT = "Chat"
const MESSAGE_LEAVE = "Leave"

var connections = make([]*WebSocketConnection, 0)


func (server *Server) WebsocketInit(w http.ResponseWriter, r *http.Request){
	currentGorillaConn, err := websocket.Upgrade(w, r, w.Header(), 1024, 1024)
	if err != nil {
		http.Error(w, "Could not open websocket connection", http.StatusBadRequest)
	}

	username := r.URL.Query().Get("username")
	currentConn := WebSocketConnection{Conn: currentGorillaConn, Username: username}
	connections = append(connections, &currentConn)

	go handleIO(&currentConn, connections)
}

func (server *Server) AddChatHistory(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	ch := models.ChatHistory{}
	err = json.Unmarshal(body, &ch)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	err = ch.Validate()
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	history, err := ch.AddChatHistory(server.DB)
	if err != nil {
		formattedError := formaterror.FormatError(err.Error())
		responses.ERROR(w, http.StatusInternalServerError, formattedError)
		return
	}
	w.Header().Set("Location", fmt.Sprintf("%s%s/%d", r.Host, r.URL.Path, history.UserID))
	responses.JSON(w, http.StatusCreated, history)
}

func (server *Server) AddChat(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	chat := models.Chat{}
	err = json.Unmarshal(body, &chat)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	err = chat.Validate()
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	chatCreated, err := chat.AddChat(server.DB)
	if err != nil {
		formattedError := formaterror.FormatError(err.Error())
		responses.ERROR(w, http.StatusInternalServerError, formattedError)
		return
	}
	w.Header().Set("Location", fmt.Sprintf("%s%s/%d", r.Host, r.URL.Path, chatCreated.ID))
	responses.JSON(w, http.StatusCreated, chatCreated)
}

func (server *Server) GetChats(w http.ResponseWriter, r *http.Request) {
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
	chats := []models.Chat{}
	err = server.DB.Debug().Model(models.Chat{}).Where("other_id = ? and user_id = ?", pid, uid).Preload("User").Find(&chats).Error
	if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		return
	}
	responses.JSON(w, http.StatusOK, chats)
}

func handleIO(currentConn *WebSocketConnection, connections []*WebSocketConnection) {
	defer func() {
		if r := recover(); r != nil {
			log.Println("ERROR", fmt.Sprintf("%v", r))
		}
	}()

	broadcastMessage(currentConn, MESSAGE_NEW_USER, "")

	for {
		payload := SocketPayload{}
		err := currentConn.ReadJSON(&payload)
		if err != nil {
			if strings.Contains(err.Error(), "websocket: close") {
				broadcastMessage(currentConn, MESSAGE_LEAVE, "")
				ejectConnection(currentConn)
				return
			}

			log.Println("ERROR", err.Error())
			continue
		}

		broadcastMessage(currentConn, MESSAGE_CHAT, payload.Message)
	}
}

func ejectConnection(currentConn *WebSocketConnection) {
	filtered := gubrak.From(connections).Reject(func(each *WebSocketConnection) bool {
		return each == currentConn
	}).Result()
	connections = filtered.([]*WebSocketConnection)
}

func broadcastMessage(currentConn *WebSocketConnection, kind, message string) {
	for _, eachConn := range connections {
		if eachConn == currentConn {
			continue
		}

		eachConn.WriteJSON(SocketResponse{
			From:    currentConn.Username,
			Type:    kind,
			Message: message,
		})
	}
}