import "../styles/profile.scss";
import "../styles/mainpage.scss";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useAuth } from "../utils/authContext";
import axios from "axios";
import Cookies from "universal-cookie";
import getUser from "../utils/getUser";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userSuggestion from "../utils/userSuggestion";
import updateView from "../utils/updateView";
const networkpage = () => {
  const auth = useAuth();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const fetch_user = async () => {
    const User = await getUser();
    auth.login(User);
  };
  const [suggestion, setSuggestion] = useState<any[]>([]);
  const fetch_suggestion = async () => {
    const temp = await userSuggestion();
    setSuggestion(temp);
  };
  useEffect(() => {
    fetch_user();
    fetch_suggestion();
  }, []);
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const navigate = useNavigate();
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
                <div className="network-menu p-menu">
                  <Link to="/block" className="text-black">
                    Block
                  </Link>
                </div>
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
              {auth.user.Invitations.length == 0 && (
                <div className="text-center mt-2">
                  There is no invitation yet..
                </div>
              )}
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
                            <div></div>
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
                      {i.Content && (
                        <div className="box-shadow ml-5 mr-1 p-1 mt-1">
                          {i.Content}
                        </div>
                      )}
                    </article>
                  );
                })}
            </div>
            <div className="box-shadow mt-10">
              <div className="flex flex-space-between btm-border">
                <h1 className="p-3">User you might know</h1>
              </div>
              {suggestion.length == 0 && (
                <div className="text-center mt-2">
                  There is no recommendation yet..
                </div>
              )}
              {suggestion &&
                suggestion.map((s) => {
                  const profileImage = cld.image(s.profile_picture);
                  return (
                    <article key={s.id}>
                      <div id="post-author">
                        <a>
                          <div
                            className="network-menu"
                            onClick={() => {
                              updateView(s, auth.user);
                              navigate("/openprofile/" + s.id);
                            }}
                          >
                            <AdvancedImage cldImg={profileImage} />
                            <div>
                              <div>
                                <strong id="post-author-name">
                                  {s.firstname} {s.lastname}
                                </strong>
                              </div>
                              <span>{s.Headline}</span>
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

export default networkpage;
