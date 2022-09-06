import parse from "html-react-parser";
import { decode } from "html-entities";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useAuth } from "../../utils/authContext";
import Cookies from "universal-cookie";
import { useState } from "react";
import Comments from "./Comments";
import getUser from "../../utils/getUser";
import { useNavigate } from "react-router-dom";
import { addNotification } from "../../utils/NotificationController";
const posts = (props: any) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const fetch_user = async () => {
    const User = await getUser();
    auth.login(User);
  };
  const auth = useAuth();
  const checkLike = () => {
    if (auth.user) {
      if (auth.user.PostsLikes.find((o: any) => o.id === props.p.id)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };
  const [liked, setLiked] = useState(checkLike());
  const cookies = new Cookies();
  const token = cookies.get("token");
  if (props.p.user && auth.user) {
    return (
      <article key={props.p.id}>
        <div id="post-author">
          <a href="#">
            <div
              onClick={() => {
                if (auth.user.id == props.p.user.id) {
                  navigate("/profile");
                } else {
                  axios.get(
                    "http://localhost:8080/updateprofileview/" +
                      props.p.user.id +
                      "/" +
                      (props.p.user.ProfileVisited + 1),
                    {
                      headers: {
                        Authorization: "Bearer " + token,
                      },
                    }
                  );
                  navigate("/openprofile/" + props.p.user.id);
                  const data = {
                    user_id: props.p.user.id,
                    content:
                      auth.user.firstname +
                      " " +
                      auth.user.lastname +
                      " viewed your profile",
                    actor_id: auth.user.id,
                  };
                  addNotification(data);
                  fetch_user();
                }
              }}
            >
              <AdvancedImage cldImg={props.profileimage} />
              <div>
                <div>
                  <strong id="post-author-name">
                    {props.p.user.firstname} {props.p.user.lastname}
                  </strong>
                </div>
                <span>{props.p.user.Headline}</span>
                <span>{props.hours}h</span>
              </div>
            </div>
          </a>
          {auth.user.id == props.p.user.id && (
            <i
              className="fa fa-trash-o text-red cursor-pointer"
              onClick={async () => {
                console.log(props);
                await axios.delete(
                  "http://localhost:8080/deletepost/" + props.p.id,
                  {
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  }
                );
                props.fetch_posts();
              }}
            ></i>
          )}
        </div>
        <div id="post-data">
          <div>{parse(decode(props.p.content))}</div>
          <AdvancedImage cldImg={props.postImage} />
        </div>
        <div id="post-interactions">
          <div id="interactions-amount">
            <span
              id="like-icon"
              className="fas fa-thumbs-up fa-flip-horizontal"
            ></span>
            <span id="amount-info">
              {props.p.Users.length} <span>&nbsp;·&nbsp;</span>{" "}
              {props.p.Comments.length} Comments
            </span>
          </div>
          <div id="interactions-btns">
            <button
              onClick={async () => {
                if (liked == false) {
                  const data = {
                    userid: auth.user.id,
                    postid: props.p.id,
                  };
                  await axios.post("http://localhost:8080/likepost", data, {
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  });
                  const temp = {
                    user_id: props.p.user.id,
                    content:
                      auth.user.firstname +
                      " " +
                      auth.user.lastname +
                      " liked your post",
                    actor_id: auth.user.id,
                  };
                  addNotification(temp);
                  setLiked(true);
                } else {
                  await axios.delete(
                    "http://localhost:8080/dislikepost/" + props.p.id,
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
                    .getElementById(`display-${props.p.id}`)
                    ?.classList.remove("d-none");
                } else {
                  setOpen(false);
                  document
                    .getElementById(`display-${props.p.id}`)
                    ?.classList.add("d-none");
                }
              }}
            >
              <span className="far fa-comment-dots fa-flip-horizontal"></span>
              <span>Comment</span>
            </button>
            <button>
              <span className="far fa-share-square"></span>
              <span>Share</span>
            </button>
          </div>
        </div>
        <div className="d-none" id={`display-${props.p.id}`}>
          <div className="commentbox">
            <div
              contentEditable
              className="input-comments"
              id={`comment-post-${props.p.id}`}
              data-placeholder="What do you want to talk about"
            ></div>
            <button
              className="comment-btn"
              onClick={() => {
                const data = {
                  userid: auth.user.id,
                  postid: props.p.id,
                  content: document.getElementById(`comment-post-${props.p.id}`)
                    ?.innerHTML,
                };
                axios
                  .post("http://localhost:8080/addcomment", data, {
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  })
                  .then(() => {
                    props.fetch_posts();
                  });
                document.getElementById(
                  `comment-post-${props.p.id}`
                )!.innerHTML = "";
              }}
            >
              Submit
            </button>
          </div>
          {props.p.Comments.map((c: any) => {
            const Image = cld.image(c.User.profile_picture);
            return (
              <Comments
                key={c.id}
                c={c}
                Image={Image}
                fetch_posts={props.fetch_posts}
              ></Comments>
            );
          })}
        </div>
      </article>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default posts;
