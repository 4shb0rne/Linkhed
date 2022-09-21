import { useAuth } from "../utils/authContext";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import parse from "html-react-parser";
import { decode } from "html-entities";
import { useEffect } from "react";
import getUser from "../utils/getUser";
import axios from "axios";
import Cookies from "universal-cookie";
const notification = () => {
  const auth = useAuth();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const fetch_user = async () => {
    const User = await getUser();
    auth.login(User);
  };
  useEffect(() => {
    fetch_user();
  }, []);
  if (auth.user) {
    return (
      <div className="container">
        <div id="left-aside-wrapper">
          <aside id="left-aside">
            <div className="box-shadow p-1">
              <div className="network-menu p-menu">Notifications</div>
            </div>
          </aside>
        </div>
        <div id="main-wrapper">
          <main id="main-section-secondary">
            <div className="box-shadow">
              <div className="flex flex-space-between btm-border">
                <h1 className="p-3">Notification</h1>
              </div>
              {auth.user.Notifications.length == 0 && (
                <div className="text-center mt-2">
                  There is no Notification yet..
                </div>
              )}
              {auth.user.Notifications &&
                auth.user.Notifications.map((i: any) => {
                  const profileImage = cld.image(i.User.profile_picture);
                  return (
                    <article key={i.ID}>
                      <div id="post-author">
                        <a>
                          <div>
                            <AdvancedImage cldImg={profileImage} />
                            <div>
                              <div>
                                <a id="post-author-name">
                                  {parse(decode(i.content))}
                                </a>
                              </div>
                            </div>
                          </div>
                        </a>
                        <i
                          className="fa fa-trash-o text-red cursor-pointer"
                          onClick={async () => {
                            await axios.delete(
                              "http://localhost:8080/deletenotification/" +
                                i.ID,
                              {
                                headers: {
                                  Authorization: "Bearer " + token,
                                },
                              }
                            );
                            fetch_user();
                          }}
                        ></i>
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
    return <div>Loading</div>;
  }
};

export default notification;
