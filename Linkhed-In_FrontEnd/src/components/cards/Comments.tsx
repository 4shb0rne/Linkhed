import Replies from "./Replies";
import parse from "html-react-parser";
import { decode } from "html-entities";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { useAuth } from "../../utils/authContext";
import Cookies from "universal-cookie";
import { useState } from "react";

const comments = (props: any) => {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const cookies = new Cookies();
  const token = cookies.get("token");
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
                  <div>
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
            {/* <AdvancedImage cldImg={props.postImage} /> */}
          </div>
          <div id="post-interactions">
            <div id="interactions-btns">
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
          {data.c.Replies.map((r: any) => {
            return <Replies data={r} key={r.id}></Replies>;
          })}
        </div>
      </article>
    </div>
  );
};

export default comments;
