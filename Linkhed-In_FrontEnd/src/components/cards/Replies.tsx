import parse from "html-react-parser";
import { decode } from "html-entities";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import Cookies from "universal-cookie";
import { useAuth } from "../../utils/authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const replies = (props: any) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const data = props.data;
  const replyImage = cld.image(data.User.profile_picture);
  const replyContent = data.content.replace(
    "@" + data.User.firstname + " " + data.User.lastname,
    ""
  );
  return (
    <div className="reply-card">
      <div key={data.id}>
        <div id="post-author">
          <a href="#">
            <div>
              <AdvancedImage cldImg={replyImage} />
              <div>
                <div>
                  <strong id="post-author-name">
                    {data.User.firstname} {data.User.lastname}
                  </strong>
                </div>
                <span>{data.User.Headline}</span>
              </div>
            </div>
          </a>
        </div>
        <div id="post-data">
          {data.MentionID == null ? (
            <div>{parse(decode(data.content))}</div>
          ) : (
            <div>
              <a
                onClick={() => {
                  if (auth.user.id == data.MentionUser.id) {
                    navigate("/profile");
                  } else {
                    axios.get(
                      "http://localhost:8080/updateprofileview/" +
                        data.MentionUser.id +
                        "/" +
                        (data.MentionUser.ProfileVisited + 1),
                      {
                        headers: {
                          Authorization: "Bearer " + token,
                        },
                      }
                    );
                    navigate("/openprofile/" + data.MentionUser.id);
                  }
                }}
                className="mention-text cursor-pointer"
              >
                @{data.MentionUser.firstname} {data.MentionUser.lastname}
              </a>
              {parse(decode(replyContent))}
            </div>
          )}
        </div>
        <div id="post-interactions">
          <div id="interactions-btns">
            {auth.user.id == data.User.id && (
              <button
                onClick={() => {
                  axios.delete("http://localhost:8080/deletereply/" + data.id, {
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  });
                  props.fetch_posts();
                }}
              >
                <span>Delete</span>
              </button>
            )}
            <button
              onClick={() => {
                if (!open) {
                  setOpen(true);
                  document
                    .getElementById(`display-reply2-${data.id}`)
                    ?.classList.remove("d-none");
                  document.getElementById(`reply-${data.id}`)!.innerHTML =
                    "@" + data.User.firstname + " " + data.User.lastname;
                } else {
                  setOpen(false);
                  document
                    .getElementById(`display-reply2-${data.id}`)
                    ?.classList.add("d-none");
                }
              }}
            >
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
      <div className="d-none" id={`display-reply2-${data.id}`}>
        <div className="commentbox">
          <div
            contentEditable
            className="input-comments"
            id={`reply-${data.id}`}
            data-placeholder="What do you want to talk about"
          ></div>
          <button
            className="comment-btn"
            onClick={() => {
              const d = {
                userid: auth.user.id,
                comment_id: data.comment_id,
                content: document.getElementById(`reply-${data.id}`)!.innerHTML,
                mentionid: data.User.id,
              };
              axios
                .post("http://localhost:8080/addreply", d, {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                })
                .then(() => {
                  document.getElementById(`reply-${data.id}`)!.innerHTML = "";
                  props.fetch_posts();
                });
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default replies;
