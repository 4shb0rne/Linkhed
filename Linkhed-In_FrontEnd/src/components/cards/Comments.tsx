import Replies from "./Replies";
import parse from "html-react-parser";
import { decode } from "html-entities";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { useAuth } from "../../utils/authContext";
import Cookies from "universal-cookie";
import { useState } from "react";
import getUser from "../../utils/getUser";

const comments = (props: any) => {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [replyCount, setReplyCount] = useState(1);
  const checkLike = () => {
    if (auth.user) {
      if (auth.user.CommentLikes.find((o: any) => o.id === props.c.id)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };
  const [liked, setLiked] = useState(checkLike());
  const data = props;
  return (
    <div key={data.c.id}>
      <article>
        <div className="comment-card">
          <div id="post-author">
            <a href="#">
              <div>
                <AdvancedImage cldImg={data.Image} />
                <div>
                  <div className="flex justify-space-between">
                    <strong id="post-author-name">
                      {data.c.User.firstname} {data.c.User.lastname}
                    </strong>
                  </div>
                  <span>{data.c.User.Headline}</span>
                </div>
              </div>
            </a>
          </div>

          <div id="post-data">
            <div>{parse(decode(data.c.content))}</div>
          </div>
          <div id="post-interactions">
            <div id="interactions-amount">
              <span
                id="like-icon"
                className="fas fa-thumbs-up fa-flip-horizontal"
              ></span>
              <span id="amount-info">{props.c.Users.length}</span>
            </div>
            <div id="interactions-btns">
              <button
                onClick={async () => {
                  if (liked == false) {
                    const data = {
                      userid: auth.user.id,
                      commentid: props.c.id,
                    };
                    await axios.post(
                      "http://localhost:8080/likecomment",
                      data,
                      {
                        headers: {
                          Authorization: "Bearer " + token,
                        },
                      }
                    );
                    setLiked(true);
                  } else {
                    await axios.delete(
                      "http://localhost:8080/dislikecomment/" + props.c.id,
                      {
                        headers: {
                          Authorization: "Bearer " + token,
                        },
                      }
                    );
                    setLiked(false);
                  }
                  const User = await getUser();
                  auth.login(User);
                  props.fetch_posts();
                }}
              >
                <span
                  className={`far fa-thumbs-up fa-flip-horizontal ${
                    liked ? "post-like-on" : ""
                  }`}
                ></span>
                <span className={`${liked ? "post-like-on" : ""}`}>Like</span>
              </button>
              <button
                onClick={() => {
                  if (!open) {
                    setOpen(true);
                    document
                      .getElementById(`display-reply-${data.c.id}`)
                      ?.classList.remove("d-none");
                  } else {
                    setOpen(false);
                    document
                      .getElementById(`display-reply-${data.c.id}`)
                      ?.classList.add("d-none");
                  }
                }}
              >
                <span>Reply</span>
              </button>
              {auth.user.id == data.c.User.id && (
                <button
                  onClick={() => {
                    axios
                      .delete(
                        "http://localhost:8080/deletecomment/" + props.c.id,
                        {
                          headers: {
                            Authorization: "Bearer " + token,
                          },
                        }
                      )
                      .then(() => {
                        data.fetch_posts();
                      });
                  }}
                >
                  <span>Delete</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="d-none" id={`display-reply-${data.c.id}`}>
          <div className="replybox">
            <div
              contentEditable
              className="input-comments"
              id={`reply-post-${data.c.id}`}
              data-placeholder="What do you want to talk about"
            ></div>
            <button
              className="comment-btn"
              onClick={() => {
                const temp = {
                  userid: auth.user.id,
                  comment_id: data.c.id,
                  content: document.getElementById(`reply-post-${data.c.id}`)
                    ?.innerHTML,
                };
                axios
                  .post("http://localhost:8080/addreply", temp, {
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  })
                  .then(() => {
                    data.fetch_posts();
                  });
                document.getElementById(`reply-post-${data.c.id}`)!.innerHTML =
                  "";
              }}
            >
              Submit
            </button>
          </div>
          {data.c.Replies.slice(0, replyCount).map((r: any) => {
            return (
              <Replies
                data={r}
                key={r.id}
                fetch_posts={data.fetch_posts}
              ></Replies>
            );
          })}
          {data.c.Replies.length > replyCount && (
            <button
              className="none-btn"
              onClick={() => {
                setReplyCount(replyCount + 1);
              }}
            >
              Load more replies
            </button>
          )}
        </div>
      </article>
    </div>
  );
};

export default comments;
