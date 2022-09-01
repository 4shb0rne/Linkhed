import "../styles/profile.scss";
import "../styles/mainpage.scss";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useAuth } from "../utils/authContext";
import axios from "axios";
import Cookies from "universal-cookie";
import getUser from "../utils/getUser";
const networkpage = () => {
  const auth = useAuth();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const fetch_user = async () => {
    const User = await getUser();
    auth.login(User);
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  if (auth.user) {
    console.log(auth.user)
    return (
      <div className="container">
        <div id="left-aside-wrapper">
          
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
                            <p className="float-right">
                            <button onClick={()=>{
                              const data1 = {
                                userid: auth.user.id,
                                connectionid: i.connection_id,
                              };
                              const data2 =  {
                                userid: i.connection.id,
                                connectionid: auth.user.id,
                              }
                              axios.post("http://localhost:8080/connectuser", data1, {
                                headers: {
                                  Authorization: "Bearer " + token,
                                },
                              });
                              axios.post("http://localhost:8080/connectuser", data2, {
                                headers: {
                                  Authorization: "Bearer " + token,
                                },
                              });
                              axios.delete("http://localhost:8080/deleteinvitation/"+i.ID, {
                                headers: {
                                  Authorization: "Bearer " + token,
                                },
                              })
                              fetch_user()
                            }}>Accept</button>
                            <button onClick={()=>{
                              axios.delete("http://localhost:8080/deleteinvitation/"+i.ID, {
                                headers: {
                                  Authorization: "Bearer " + token,
                                },
                              })
                              fetch_user()
                            }}>Decline</button>
                            </p>
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
