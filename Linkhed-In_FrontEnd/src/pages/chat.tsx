import { useEffect, useState } from "react";
import "../styles/chat.scss";
import * as WebSocket from "websocket";
import { useAuth } from "../utils/authContext";
const chat = () => {
  const auth = useAuth();
  if (auth.user) {
    const socket = new WebSocket.w3cwebsocket(
      "ws://localhost:8080/ws?username=" + auth.user.email
    );
    const sendMessage = (messageRaw: any) => {
      socket.send(
        JSON.stringify({
          Message: messageRaw,
        })
      );
    };
    useEffect(() => {
      socket.onmessage = (event: any) => {
        console.log(event);
        var res = JSON.parse(event.data);

        var message = "";
        if (res.Message != "") {
          message = "<b>" + res.From + "</b>: " + res.Message;

          var el = document.createElement("p");
          el.innerHTML = message;
          document.querySelector(".container-chat")!.append(el);
        }
      };
    }, []);
    const user = auth.user.email;
    return (
      <div>
        <div className="container-chat"></div>
        <div className="form">
          <form>
            <div className="placeholder">
              <label>
                Hello <b className="username">{user}</b>. Say something:
              </label>
            </div>
            <input
              className="input-message"
              type="text"
              placeholder="Enter message"
            />
            <button
              type="button"
              onClick={() => {
                var messageRaw = (
                  document.querySelector(".input-message") as HTMLInputElement
                ).value;
                sendMessage(messageRaw);
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <div>TEST</div>;
  }
};

export default chat;
