import { useParams } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/searchpage.scss";
import Posts from "../components/cards/Posts";
import "../styles/mainpage.scss";
import Userlist from "../components/cards/userlist";
import { useAuth } from "../utils/authContext";
import { useModal } from "../utils/modalContext";
import Modal from "../components/cards/modal";
import InviteModal from "../components/cards/modal/invitemodal";
import InfiniteScroll from "react-infinite-scroll-component";
const searchpage = () => {
  const params = useParams();
  const cookies = new Cookies();
  const auth = useAuth();
  const token = cookies.get("token");
  const [post, setPost] = useState(true);
  const [people, setPeople] = useState(true);
  const [invitedUser, setInvitedUser] = useState(null);
  const [morePost, setMorePost] = useState(true);
  const [moreUser, setMoreUser] = useState(true);
  const modal = useModal();
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [postCount, setPostCount] = useState(1);
  const [userCount, setUserCount] = useState(1);
  const searchUser = () => {
    const data = {
      content: params.query,
    };
    setUserCount(userCount + 1);
    setTimeout(() => {
      axios
        .post("http://localhost:8080/searchuser/" + userCount, data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          if (response.data.length == users.length) {
            setMoreUser(false);
          }
          setUsers(response.data);
        });
    }, 1000);
  };

  const searchPost = () => {
    const data = {
      content: params.query,
    };
    setPostCount(postCount + 1);
    setTimeout(() => {
      axios
        .post("http://localhost:8080/searchpost/" + postCount, data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          if (response.data.length == posts.length) {
            setMorePost(false);
          }
          setPosts(response.data);
        });
    }, 1000);
  };

  useEffect(() => {
    searchUser();
    searchPost();
  }, []);

  if (auth.user) {
    return (
      <div>
        <Modal modal={modal.isOpen} setModal={modal.setIsOpen} ariaText="Block">
          <InviteModal
            invitedUser={invitedUser}
            curruser={auth.user}
          ></InviteModal>
        </Modal>
        <div className="box-shadow m-10 mt-1 flex">
          <button
            className="filter-btn m-1"
            onClick={() => {
              if (!people && !post) {
                setPeople(true);
              } else {
                if (post == false) {
                  setPost(true);
                } else {
                  setPost(false);
                }
              }
            }}
          >
            People
          </button>
          <button
            className="filter-btn m-1"
            onClick={() => {
              if (!people && !post) {
                setPost(true);
              } else {
                if (people == false) {
                  setPeople(true);
                } else {
                  setPeople(false);
                }
              }
            }}
          >
            Post
          </button>
        </div>
        {users.length != 0 && people ? (
          <div className="box-shadow m-10 mt-1">
            <div className="flex flex-space-between">
              <h1 className="p-3">Users</h1>
            </div>
            <InfiniteScroll
              dataLength={posts.length}
              next={searchUser}
              hasMore={moreUser}
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
              {users.map((u) => {
                return (
                  <Userlist u={u} setInvitedUser={setInvitedUser}></Userlist>
                );
              })}
            </InfiniteScroll>
          </div>
        ) : (
          <div></div>
        )}
        <InfiniteScroll
          dataLength={posts.length}
          next={searchPost}
          hasMore={morePost}
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
          {posts.length != 0 && post ? (
            <div className="box-shadow m-10 mt-1">
              <div className="flex flex-space-between">
                <h1 className="p-3">Posts</h1>
              </div>
              <main id="main-section">
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
                        fetch_posts={searchPost}
                        profileimage={profileimage}
                        postImage={postImage}
                      ></Posts>
                    );
                  })}
              </main>
            </div>
          ) : (
            <div></div>
          )}
        </InfiniteScroll>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default searchpage;
