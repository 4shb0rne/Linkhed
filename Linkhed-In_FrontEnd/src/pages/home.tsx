import { useEffect, useState } from "react";
import "../styles/mainpage.scss";
import { useAuth } from "../utils/authContext";
import getUser from "../utils/getUser";
import getPost from "../utils/getPost";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useModal } from "../utils/modalContext";
import AddPost from "../components/cards/addpost";
import Modal from "../components/cards/modal";
import parse from "html-react-parser";
import { decode } from "html-entities";
const home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const modal = useModal();
  const auth = useAuth();
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const fetch_user = async () => {
    const User = await getUser();
    auth.login(User);
  };
  const fetch_posts = async () => {
    const posts = await getPost();
    setPosts(posts);
  };
  useEffect(() => {
    fetch_user();
    fetch_posts();
  }, []);
  const myImage = cld.image(
    auth.user ? auth.user.profile_picture : "blank_bjt7w5"
  );

  return (
    <div className="container">
      <Modal
        modal={modal.isOpen}
        setModal={modal.setIsOpen}
        ariaText="Profile Settings"
      >
        <AddPost fetch_posts={fetch_posts}></AddPost>
      </Modal>
      <div id="left-aside-wrapper">
        <aside id="left-aside">
          <div id="profile-card">
            <div id="background"></div>
            <div id="profile-info">
              <AdvancedImage cldImg={myImage} />
              <strong id="profile-name">
                {auth.user && auth.user.firstname}{" "}
                {auth.user && auth.user.lastname}
              </strong>
              <small>{auth.user && auth.user.Headline}</small>
            </div>
            <div id="profile-links">
              <a>
                <span> Who's viewed your profile </span>
                <span className="profile-number"> 102 </span>
              </a>
              <a>
                <span> Connections </span>
                <span className="profile-number"> 452 </span>
              </a>
            </div>
          </div>
        </aside>
      </div>
      <div id="main-wrapper">
        <main id="main-section">
          <div id="share-box">
            <div id="button-box">
              <button
                id="btn-post"
                onClick={() => {
                  modal.setIsOpen(true);
                }}
              >
                <span className="fas fa-edit"></span>
                <span id="btn-text">Start a post</span>
              </button>
              <button id="btn-picture">
                <span className="fas fa-camera"></span>
              </button>
              <button id="btn-video">
                <span className="fas fa-video"></span>
              </button>
              <button id="btn-document">
                <span className="fas fa-file"></span>
              </button>
            </div>
            <div id="link-box">
              <a href="#">Write an article</a>
              <span> on LinkedIn</span>
            </div>
          </div>
          <div id="feed-sort">
            <hr />
          </div>
          {posts &&
            posts.map((p) => {
              const postImage = cld.image(p.attachment);
              const profileimage = cld.image(p.user.profile_picture);
              var hours = Math.floor(
                Math.abs(
                  new Date().valueOf() - new Date(p.updated_at).valueOf()
                ) / 36e5
              );
              return (
                <article>
                  <div id="post-author">
                    <a href="#">
                      <div>
                        <AdvancedImage cldImg={profileimage} />
                        <div>
                          <div>
                            <strong id="post-author-name">
                              {p.user.firstname} {p.user.lastname}
                            </strong>
                          </div>
                          <span>{p.user.Headline}</span>
                          <span>{hours}h</span>
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
                    <div>{parse(decode(p.content))}</div>
                    <AdvancedImage cldImg={postImage} />
                    {/* <img src="smolame.gif" alt="" className="image-size" /> */}
                  </div>
                  <div id="post-interactions">
                    <div id="interactions-amount">
                      <span
                        id="like-icon"
                        className="fas fa-thumbs-up fa-flip-horizontal"
                      ></span>
                      <span id="heart-icon" className="fas fa-heart"></span>
                      <span id="amount-info">
                        6969 <span>&nbsp;·&nbsp;</span> 100 Comments
                      </span>
                    </div>
                    <div id="interactions-btns">
                      <button>
                        <span className="far fa-thumbs-up fa-flip-horizontal"></span>
                        <span>Like</span>
                      </button>
                      <button>
                        <span className="far fa-comment-dots fa-flip-horizontal"></span>
                        <span>Comment</span>
                      </button>
                      <button>
                        <span className="far fa-share-square"></span>
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                  <div className="commentbox">
                    <div
                      contentEditable
                      className="input-comments"
                      id="content-post"
                      data-placeholder="What do you want to talk about"
                    ></div>
                    <button className="comment-btn">Submit</button>
                  </div>
                </article>
              );
            })}

          <article>
            <div id="post-author">
              <a href="#">
                <div>
                  <img src="amepp.jfif" alt="" />
                  <div>
                    <div>
                      <strong id="post-author-name">Amelia wattson</strong>
                      <span>
                        <span>&nbsp;·&nbsp;</span>
                        1st
                      </span>
                    </div>
                    <span>Your mother</span>
                    <span>12h</span>
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
              <p>
                <span>smol ame </span>power
              </p>
              <img src="smolame.gif" alt="" className="image-size" />
            </div>
            <div id="post-interactions">
              <div id="interactions-amount">
                <span
                  id="like-icon"
                  className="fas fa-thumbs-up fa-flip-horizontal"
                ></span>
                <span id="heart-icon" className="fas fa-heart"></span>
                <span id="amount-info">
                  6969 <span>&nbsp;·&nbsp;</span> 100 Comments
                </span>
              </div>
              <div id="interactions-btns">
                <button>
                  <span className="far fa-thumbs-up fa-flip-horizontal"></span>
                  <span>Like</span>
                </button>
                <button>
                  <span className="far fa-comment-dots fa-flip-horizontal"></span>
                  <span>Comment</span>
                </button>
                <button>
                  <span className="far fa-share-square"></span>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};

export default home;
