import { useEffect, useState } from "react";
import "../styles/mainpage.scss";
import "../styles/loading.scss";
import { useAuth } from "../utils/authContext";
import getUser from "../utils/getUser";
import getPost from "../utils/getPost";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useModal } from "../utils/modalContext";
import AddPost from "../components/cards/addpost";
import Modal from "../components/cards/modal";
import Posts from "../components/cards/Posts";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
const home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [length, setLength] = useState(3);
  const [hasmore, setHasMore] = useState(true);
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
    const posts = await getPost(length);
    setPosts(posts);
  };

  const load_posts = () => {
    setLength(length + 1);
    if (length + 1 == Posts.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setTimeout(() => {
      axios
        .get("http://localhost:8080/posts/" + (length + 1))
        .then((response) => {
          console.log(response.data);
          setPosts(response.data);
        });
    }, 1000);
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
          <InfiniteScroll
            dataLength={posts.length}
            next={load_posts}
            hasMore={hasmore}
            loader={
              <div className="loading-center">
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            }
          >
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
                  <Posts
                    key={p.id}
                    p={p}
                    hours={hours}
                    fetch_posts={fetch_posts}
                    profileimage={profileimage}
                    postImage={postImage}
                  ></Posts>
                );
              })}
          </InfiniteScroll>
        </main>
      </div>
    </div>
  );
};

export default home;
