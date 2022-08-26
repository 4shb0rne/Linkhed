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

const posts = (props: any) => {
  const [open, setOpen] = useState(false);
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const auth = useAuth();
  const checkLike = ()=>{
    if(auth.user.Posts.find((o : any) => o.id === props.p.id)){
      return true;
    } else{
      return false;
    }
  }
  const [liked, setLiked] = useState(checkLike());
  const cookies = new Cookies();
  const token = cookies.get("token");
  return (
    <article key={props.p.id}>
      <div id="post-author">
        <a href="#">
          <div>
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
        <div>
          <span className="fas fa-circle"></span>
          <span className="fas fa-circle"></span>
          <span className="fas fa-circle"></span>
        </div>
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
            {props.p.Users.length} <span>&nbsp;·&nbsp;</span> {props.p.Comments.length} Comments
          </span>
        </div>
        <div id="interactions-btns">
          <button onClick={async()=>{
            if(liked == false){
              const data = {
                userid: auth.user.id,
                postid: props.p.id
              }
              await axios.post("http://localhost:8080/likepost", data, {
                headers: {
                  Authorization: "Bearer " + token,
                },
              })
              setLiked(true)
            } else{
              await axios.delete("http://localhost:8080/dislikepost/"+props.p.id, {
                headers: {
                  Authorization: "Bearer " + token,
                },
              })
              setLiked(false)
            }
            const User = await getUser();
            auth.login(User);
          }}>
            <span className={`far fa-thumbs-up fa-flip-horizontal ${liked ? "post-like-on" : ""}`}></span>
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
              document.getElementById(`comment-post-${props.p.id}`)!.innerHTML =
                "";
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
};

export default posts;