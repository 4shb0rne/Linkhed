import { useAuth } from "../utils/authContext";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import parse from "html-react-parser";
import { decode } from "html-entities";

const notification = () => {
  const auth = useAuth();
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
              <div className="network-menu p-1">Notifications</div>
            </div>
          </aside>
        </div>
        <div id="main-wrapper">
          <main id="main-section">
            <div className="box-shadow">
              <div className="flex flex-space-between btm-border">
                <h1 className="p-3">Notification</h1>
              </div>
              {auth.user.Notifications &&
                auth.user.Notifications.map((i: any) => {
                  {
                    console.log(i);
                  }
                  const profileImage = cld.image(i.User.profile_picture);
                  return (
                    <article key={i.id}>
                      <div id="post-author">
                        <a>
                          <div>
                            <AdvancedImage cldImg={profileImage} />
                            <div>
                              <div>
                                <a id="post-author-name">{parse(decode(i.content))}</a>
                              </div>
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
    return <div>Loading</div>;
  }
};

export default notification;
