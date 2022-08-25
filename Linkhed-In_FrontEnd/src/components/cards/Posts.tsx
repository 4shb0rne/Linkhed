
import parse from "html-react-parser";
import { decode } from "html-entities";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useAuth } from "../../utils/authContext";
import Cookies from "universal-cookie";
import { useState } from "react";
const comments = (props : any) =>{
    const [open, setOpen] = useState(false);
    const cld = new Cloudinary({
        cloud: {
          cloudName: "ashbornee",
        },
    });
    const auth = useAuth();
    const cookies = new Cookies();
    const token = cookies.get("token");
    return(
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
                        6969 <span>&nbsp;·&nbsp;</span> {(props.p.Comments).length} Comments
                      </span>
                    </div>
                    <div id="interactions-btns">
                      <button>
                        <span className="far fa-thumbs-up fa-flip-horizontal"></span>
                        <span>Like</span>
                      </button>
                      <button onClick={()=>{
                            if(!open){
                                setOpen(true)
                                document.getElementById(`display-${props.p.id}`)?.classList.remove("d-none")
                            } else{
                                setOpen(false)
                                document.getElementById(`display-${props.p.id}`)?.classList.add("d-none")
                            }
                        }}>
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
                      <button className="comment-btn" onClick={()=>{
                        const data = {
                          userid: auth.user.id,
                          postid: props.p.id,
                          content: document.getElementById(`comment-post-${props.p.id}`)?.innerHTML
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
                          document.getElementById(`comment-post-${props.p.id}`)!.innerHTML = "";
                      }}>Submit</button>
                    </div>
                    {props.p.Comments.map((c: any) => {
                      const Image = cld.image(c.User.profile_picture);
                      return (
                      <div key={c.id}>
                        <article>
                          <div className="comment-card">
                            <div id="post-author">
                            <a href="#">
                              <div>
                                <AdvancedImage cldImg={Image} />
                                <div>
                                  <div>
                                    <strong id="post-author-name">
                                      {c.User.firstname} {c.User.lastname}
                                    </strong>
                                  </div>
                                  <span>{c.User.Headline}</span>
                                </div>
                              </div>
                            </a>
                            </div>
                            <div id="post-data">
                              <div>{parse(decode(c.content))}</div>
                              {/* <AdvancedImage cldImg={props.postImage} /> */}
                            </div>
                            <div id="post-interactions">
                              <div id="interactions-btns">
                                <button>
                                  <span>Reply</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        <div className="">
                          <div className="replybox">
                            <div
                              contentEditable
                              className="input-comments"
                              id={`reply-post-${props.p.id}`}
                              data-placeholder="What do you want to talk about"
                            ></div>
                            <button className="comment-btn" onClick={()=>{
                              
                            }}>Submit</button>
                          </div>
                          <div className="reply-card">
                              <div key={c.id}>
                                <div id="post-author">
                                  <a href="#">
                                    <div>
                                      <AdvancedImage cldImg={Image} />
                                      <div>
                                        <div>
                                          <strong id="post-author-name">
                                            {c.User.firstname} {c.User.lastname}
                                          </strong>
                                        </div>
                                        <span>{c.User.Headline}</span>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                                <div id="post-data">
                                  <div>{parse(decode(c.content))}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                      </article>
                      </div>
                      )
                    })}
                    </div>
                  </article>
    )
}

export default comments