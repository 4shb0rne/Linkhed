import { useAuth } from "../utils/authContext";
import { useEffect, useState } from "react";
import "../styles/chat.scss";
import { getMessages, sendMessage } from "../utils/chatController";
import useSWR from "swr";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
const messaging = () => {
  const auth = useAuth();
  const [otherId, setOtherId] = useState(0);
  const fetcher = (url: any) => {
    if (auth.user && otherId != 0) {
      getMessages(auth.user.id, otherId).then((message) => {
        setMessages(message);
      });
    }
  };
  const { data, error } = useSWR("http://localhost:8080/", fetcher, {
    refreshInterval: 500,
  });
  const [otherUser, setOtherUser] = useState(null);
  const [messages, setMessages] = useState<any[]>([]);

  const fetch_chats = async (otheruser: number) => {
    const message = await getMessages(auth.user.id, otheruser);
    setMessages(message);
  };
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  if (auth.user) {
    return (
      <div className="container">
        <div id="left-aside-wrapper">
          <aside id="left-aside">
            <div className="box-shadow p-1">
              <div className="network-menu p-menu">Messaging</div>
              {auth.user.ChatHistories.map((c: any) => {
                const profileImage = cld.image(c.OtherUser.profile_picture);
                return (
                  <div id="post-author">
                    <a href="#">
                      <div
                        onClick={() => {
                          setOtherId(c.OtherUser.id);
                          fetch_chats(c.OtherUser.id);
                        }}
                      >
                        <AdvancedImage cldImg={profileImage} />
                        <div>
                          <div>
                            <strong id="post-author-name">
                              {c.OtherUser.firstname} {c.OtherUser.lastname}
                            </strong>
                          </div>
                          <span>{c.OtherUser.Headline}</span>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
        <div id="main-wrapper">
          <main id="main-section-secondary">
            <div className="box-shadow">
              <div className="flex flex-space-between btm-border">
                <h1 className="p-3">Messages</h1>
              </div>
              {messages.length == 0 && (
                <div className="text-center mt-2">No Messages</div>
              )}
              {messages &&
                messages.map((m) => {
                  const profileImage = cld.image(m.User.profile_picture);
                  return (
                    <div id="post-author">
                      <a href="#">
                        <div>
                          <AdvancedImage cldImg={profileImage} />
                          <div>
                            <div>
                              <strong id="post-author-name">
                                {m.User.firstname} {m.User.lastname}
                              </strong>
                            </div>
                            <span>{m.Content}</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}
            </div>
            {otherId != 0 && (
              <div className="commentbox mt-1">
                <input type="text" id="input-message"></input>
                <button
                  className="comment-btn"
                  onClick={() => {
                    const message = (
                      document.getElementById(
                        "input-message"
                      ) as HTMLInputElement
                    ).value;
                    sendMessage(auth.user.id, otherId, message);
                    (
                      document.getElementById(
                        "input-message"
                      ) as HTMLInputElement
                    ).value = "";
                  }}
                >
                  Submit
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default messaging;
