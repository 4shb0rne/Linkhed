import "../styles/profile.scss";
import "../styles/mainpage.scss";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useAuth } from "../utils/authContext";
import axios from "axios";
import Cookies from "universal-cookie";
import getUser from "../utils/getUser";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const networkpage = () => {
  const auth = useAuth();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const fetch_user = async () => {
    const User = await getUser();
    auth.login(User);
  };
  useEffect(() => {
    fetch_user();
  }, []);
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  if (auth.user) {
    return (
      <div className="container">
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
          <main id="main-section">
            <div className="box-shadow">
              <div className="flex flex-space-between btm-border">
                <h1 className="p-3">Invitation</h1>
              </div>
              {auth.user.Invitations &&
                auth.user.Invitations.map((i: any) => {
                  const profileImage = cld.image(i.User.profile_picture);
                  return (
                    <article key={i.id}>
                      <div id="post-author">
                        <a>
                          <div>
                            <AdvancedImage cldImg={profileImage} />
                            <div>
                              <div>
                                <strong id="post-author-name">
                                  {i.User.firstname} {i.User.lastname}
                                </strong>
                              </div>
                              <span>{i.User.Headline}</span>
                            </div>
                            <button
                              className="accept-btn"
                              onClick={() => {
                                const data1 = {
                                  userid: auth.user.id,
                                  connectionid: i.user_id,
                                };
                                const data2 = {
                                  userid: i.user_id,
                                  connectionid: auth.user.id,
                                };
                                axios.post(
                                  "http://localhost:8080/connectuser",
                                  data1,
                                  {
                                    headers: {
                                      Authorization: "Bearer " + token,
                                    },
                                  }
                                );
                                axios.post(
                                  "http://localhost:8080/connectuser",
                                  data2,
                                  {
                                    headers: {
                                      Authorization: "Bearer " + token,
                                    },
                                  }
                                );
                                axios.delete(
                                  "http://localhost:8080/deleteinvitation/" +
                                    i.ID,
                                  {
                                    headers: {
                                      Authorization: "Bearer " + token,
                                    },
                                  }
                                );
                                fetch_user();
                              }}
                            >
                              Accept
                            </button>
                            <button
                              className="decline-btn"
                              onClick={() => {
                                axios.delete(
                                  "http://localhost:8080/deleteinvitation/" +
                                    i.ID,
                                  {
                                    headers: {
                                      Authorization: "Bearer " + token,
                                    },
                                  }
                                );
                                fetch_user();
                              }}
                            >
                              Decline
                            </button>
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

export default networkpage;
