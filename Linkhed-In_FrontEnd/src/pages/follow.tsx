import "../styles/profile.scss";
import "../styles/mainpage.scss";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useAuth } from "../utils/authContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import getUser from "../utils/getUser";
const follow = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const cookies = new Cookies();
  const token = cookies.get("token");
  const auth = useAuth();
  const [follow, setFollow] = useState(false);
  const fetch_current_user = async () => {
    const User = await getUser();
    auth.login(User);
  };
  if (auth.user) {
    console.log(auth.user);
    return (
      <div className="container mt-1">
        <div id="left-aside-wrapper">
          <aside id="left-aside">
            <div className="box-shadow p-1">
              <div>Manage your networks</div>
              <div>
                <div className="network-menu p-menu">
                  <Link to="/connection" className="text-black">
                    Connections
                  </Link>
                </div>
                <div className="network-menu p-menu">Contacts</div>
                <div className="network-menu p-menu">
                  <Link to="/follow" className="text-black">
                    People | Follow
                  </Link>
                </div>
                <div className="network-menu p-menu">Group</div>
              </div>
            </div>
          </aside>
        </div>
        <div id="main-wrapper">
          <main id="main-section-secondary">
            <div className="box-shadow">
              <button
                className="filter-btn m-1"
                onClick={() => {
                  setFollow(true);
                }}
              >
                {auth.user.Following.length} Following
              </button>
              <button
                className="filter-btn m-1"
                onClick={() => {
                  setFollow(false);
                }}
              >
                {auth.user.Followers.length} Followers
              </button>
            </div>
            <div className="box-shadow">
              <div className="flex flex-space-between btm-border">
                <h1 className="p-3">
                  {follow == true ? <>Following</> : <>Followers</>}
                </h1>
              </div>
              {auth.user.Following && follow
                ? auth.user.Following.map((u: any) => {
                    const profileImage = cld.image(u.User.profile_picture);
                    return (
                      <article key={u.User.FollowerID} className="p-1">
                        <div id="post-author">
                          <a>
                            <div>
                              <AdvancedImage cldImg={profileImage} />
                              <div>
                                <div>
                                  <strong id="post-author-name">
                                    {u.User.firstname} {u.User.lastname}
                                  </strong>
                                </div>
                                <span>{u.User.Headline}</span>
                              </div>
                              <button
                                className="follow-btn right-side"
                                onClick={() => {
                                  axios
                                    .delete(
                                      "http://localhost:8080/unfollowuser/" +
                                        u.User.id +
                                        "/" +
                                        auth.user.id,
                                      {
                                        headers: {
                                          Authorization: "Bearer " + token,
                                        },
                                      }
                                    )
                                    .then(() => {
                                      fetch_current_user();
                                    });
                                }}
                              >
                                Unfollow
                              </button>
                            </div>
                          </a>
                        </div>
                      </article>
                    );
                  })
                : auth.user.Followers.map((u: any) => {
                    const profileImage = cld.image(u.Follower.profile_picture);
                    console.log(u);
                    return (
                      <article key={u.Follower.id} className="p-1">
                        <div id="post-author">
                          <a>
                            <div>
                              <AdvancedImage cldImg={profileImage} />
                              <div>
                                <div>
                                  <strong id="post-author-name">
                                    {u.Follower.firstname} {u.Follower.lastname}
                                  </strong>
                                </div>
                                <span>{u.Follower.Headline}</span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </article>
                    );
                  })}
            </div>
          </main>
        </div>
      </div>
    );
  } else {
    return <div>Loading </div>;
  }
};

export default follow;
