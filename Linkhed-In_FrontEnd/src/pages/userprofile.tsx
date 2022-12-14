import { useAuth } from "../utils/authContext";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { useEffect, useState } from "react";
import getEducation from "../utils/getEducation";
import getExperience from "../utils/getExperience";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import getUser from "../utils/getUser";
import { useModal } from "../utils/modalContext";
import Modal from "../components/cards/modal";
import BlockModal from "../components/cards/modal/blockmodal";
import { addChatHistory } from "../utils/chatController";
const userprofile = () => {
  const params = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const id = parseInt(params.id!);
  const [user, setUser]: any = useState(null);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const modal = useModal();
  const fetch_user = async () => {
    axios.get("http://localhost:8080/users/" + params.id).then((response) => {
      setUser(response.data);
    });
  };
  const fetch_current_user = async () => {
    const User = await getUser();
    auth.login(User);
  };
  const checkConnect = () => {
    if (auth.user) {
      if (auth.user.Connections.find((o: any) => o.id === id)) {
        return true;
      } else {
        return false;
      }
    }
    fetch_current_user();
    return false;
  };

  const [educations, setEducations] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const fetch_educations = async () => {
    const educations = await getEducation(id);
    setEducations(educations);
  };
  const fetch_experiences = async () => {
    const experience = await getExperience(id);
    setExperiences(experience);
  };

  useEffect(() => {
    fetch_user();
    fetch_educations();
    fetch_experiences();
  }, []);
  const [connect, setConnect] = useState(checkConnect());

  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });

  if (user && auth.user) {
    const myImage = cld.image(user["profile_picture"]);
    const myBackgroundImage = cld.image(user["background_picture"]);
    myImage.resize(fill().width(250).height(250));

    return (
      <div>
        <Modal modal={modal.isOpen} setModal={modal.setIsOpen} ariaText="Block">
          <BlockModal
            user={user}
            currentuser={auth.user}
            fetch={fetch_current_user}
          ></BlockModal>
        </Modal>
        ;
        <div className="box-shadow m-10">
          <div id="profile-upper">
            <div id="profile-banner-image">
              <label htmlFor="backgroundupload">
                <AdvancedImage cldImg={myBackgroundImage} />
              </label>
            </div>
            <div id="profile-d">
              <div id="profile-pic">
                <label htmlFor="imgupload">
                  <AdvancedImage cldImg={myImage} />
                </label>
              </div>
              <div className="tb" id="m-btns">
                <div className="td"></div>
                <div className="td"></div>
              </div>
              <div id="edit-profile"></div>
            </div>
            <div id="black-grd"></div>
          </div>
          <div className="ml-5">
            <div className="flex mt-5">
              <h1>
                {user["firstname"]} {user["lastname"]}
              </h1>
              {auth.user.id != id && connect == false ? (
                <button
                  className="connect-btn"
                  onClick={() => {
                    const data = {
                      user_id: auth.user.id,
                      connection_id: id,
                    };
                    axios.post("http://localhost:8080/sendinvitation", data, {
                      headers: {
                        Authorization: "Bearer " + token,
                      },
                    });
                  }}
                >
                  Connect
                </button>
              ) : (
                <div></div>
              )}
              {auth.user.id != id && connect == true ? (
                <button
                  className="decline-btn"
                  onClick={() => {
                    axios.delete(
                      "http://localhost:8080/disconnectuser/" +
                        id +
                        "/" +
                        auth.user.id,
                      {
                        headers: {
                          Authorization: "Bearer " + token,
                        },
                      }
                    );
                    axios.delete(
                      "http://localhost:8080/disconnectuser/" +
                        auth.user.id +
                        "/" +
                        id,
                      {
                        headers: {
                          Authorization: "Bearer " + token,
                        },
                      }
                    );
                    setConnect(false);
                  }}
                >
                  Remove Connection
                </button>
              ) : (
                <div></div>
              )}
              {auth.user.id != id &&
              !user.Followers.find(
                (o: any) => o.FollowerID === auth.user.id
              ) ? (
                <button
                  className="follow-btn"
                  onClick={() => {
                    const data = {
                      userid: id,
                      followerid: auth.user.id,
                    };
                    axios.post("http://localhost:8080/followuser", data, {
                      headers: {
                        Authorization: "Bearer " + token,
                      },
                    });
                    fetch_user();
                  }}
                >
                  <i className="fa fa-plus"></i> Follow
                </button>
              ) : (
                <div></div>
              )}
              {auth.user.id != id &&
              user.Followers.find((o: any) => o.FollowerID === auth.user.id) ? (
                <button
                  className="follow-btn"
                  onClick={() => {
                    axios.delete(
                      "http://localhost:8080/unfollowuser/" +
                        id +
                        "/" +
                        auth.user.id,
                      {
                        headers: {
                          Authorization: "Bearer " + token,
                        },
                      }
                    );
                    fetch_user();
                  }}
                >
                  <i className="fa fa-plus"></i> Unfollow
                </button>
              ) : (
                <div></div>
              )}
              <button
                className="message-btn"
                onClick={() => {
                  if (
                    !auth.user.ChatHistories.find(
                      (ch: any) => ch.UserID == auth.user.id
                    )
                  ) {
                    addChatHistory(auth.user.id, id);
                  }
                  navigate("/message");
                }}
              >
                Message
              </button>
              <button
                className="block-btn"
                onClick={() => {
                  modal.setIsOpen(true);
                }}
              >
                Block
              </button>
            </div>
          </div>
          <div className="flex ml-5">{user["Headline"]}</div>
          <div className="flex ml-5">
            {user["City"]}, {user["Country"]}
          </div>
        </div>
        <div className="box-shadow m-10 mt-1">
          <div className="flex flex-space-between">
            <h1 className="p-3">Education</h1>
          </div>
          {educations &&
            educations.map((e) => {
              return (
                <div className="m-3 mt-1">
                  <h2>{e.School}</h2>
                  <p>
                    {e.Degree}, {e.FieldOfStudy}
                  </p>
                  <p className="text-gray">
                    {e.StartYear} - {e.EndYear}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="box-shadow m-10 mt-1">
          <div className="flex flex-space-between">
            <h1 className="p-3">Experience</h1>
          </div>
          {experiences &&
            experiences.map((e) => {
              return (
                <div className="m-3 mt-1">
                  <h1>{e.CompanyName}</h1>
                  <h2>{e.Title}</h2>
                  <p>{e.EmploymentType}</p>
                  <p className="text-gray">
                    {e.StartMonth}-{e.StartYear} -{" "}
                    {e.EndYear == 0 ? "Present" : e.EndMonth + "-" + e.EndYear}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default userprofile;
