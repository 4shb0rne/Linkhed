import { useAuth } from "../utils/authContext";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Link } from "react-router-dom";
import axios from "axios";
import getUser from "../utils/getUser";
import Cookies from "universal-cookie";

const block = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const fetch_user = async () => {
    const User = await getUser();
    auth.login(User);
  };
  const cookies = new Cookies();
  const auth = useAuth();
  const token = cookies.get("token");
  console.log(auth.user);
  if (auth.user) {
    console.log(auth.user);
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
          <main id="main-section-secondary">
            <div className="box-shadow">
              <div className="flex flex-space-between btm-border">
                <h1 className="p-3">Block List</h1>
              </div>
              {auth.user.Connections.length == 0 && (
                <div className="text-center mt-2">
                  You don't blocked anyone..
                </div>
              )}
              {auth.user.Blocking &&
                auth.user.Blocking.map((c: any) => {
                  const profileImage = cld.image(c.Block.profile_picture);
                  return (
                    <article key={c.id}>
                      <div id="post-author">
                        <a>
                          <div>
                            <AdvancedImage cldImg={profileImage} />
                            <div>
                              <div>
                                <strong id="post-author-name">
                                  {c.Block.firstname} {c.Block.lastname}
                                </strong>
                              </div>
                              <span>{c.Block.Headline}</span>
                            </div>
                            <button
                              className="decline-btn"
                              onClick={() => {
                                axios
                                  .delete(
                                    "http://localhost:8080/unblockuser/" +
                                      auth.user.id +
                                      "/" +
                                      c.Block.id,
                                    {
                                      headers: {
                                        Authorization: "Bearer " + token,
                                      },
                                    }
                                  )
                                  .then(() => {
                                    fetch_user();
                                  });
                              }}
                            >
                              Unblock
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

export default block;
