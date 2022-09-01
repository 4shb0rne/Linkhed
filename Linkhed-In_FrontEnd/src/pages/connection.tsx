import "../styles/profile.scss";
import "../styles/mainpage.scss";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useAuth } from "../utils/authContext";
import axios from "axios";
import Cookies from "universal-cookie";
import getUser from "../utils/getUser";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const connection = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const auth = useAuth();
  if (auth.user) {
    return (
      <div className="container">
        <div id="left-aside-wrapper">
          <aside id="left-aside">
            <div className="box-shadow p-1">
              <div>Manage your networks</div>
              <div>
                <div className="network-menu p-1">
                  <Link to="/connection" className="text-black">
                    Connections
                  </Link>
                </div>
                <div className="network-menu p-1">Contacts</div>
                <div className="network-menu p-1">People | Follow</div>
                <div className="network-menu p-1">Group</div>
              </div>
            </div>
          </aside>
        </div>
        <div id="main-wrapper">
          <main id="main-section">
            <div className="box-shadow">
              <div className="flex flex-space-between btm-border">
                <h1 className="p-3">Connection</h1>
              </div>
              {auth.user.Connections &&
                auth.user.Connections.map((c: any) => {
                  const profileImage = cld.image(c.profile_picture);
                  return (
                    <article key={c.id}>
                      <div id="post-author">
                        <a>
                          <div>
                            <AdvancedImage cldImg={profileImage} />
                            <div>
                              <div>
                                <strong id="post-author-name">
                                  {c.firstname} {c.lastname}
                                </strong>
                              </div>
                              <span>{c.Headline}</span>
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

export default connection;
