import "../styles/profile.scss";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useAuth } from "../utils/authContext";
const networkpage = () => {
  const auth = useAuth();
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  if (auth.user) {
    return (
      <div>
        <div className="box-shadow m-10 mt-1">
          <div className="flex flex-space-between btm-border">
            <h1 className="p-3">Invitation</h1>
          </div>

          {auth.user.Invitations &&
            auth.user.Invitations.map((i: any) => {
              const profileImage = cld.image(i.user.profile_picture);
              return (
                <article key={i.id}>
                  <div id="post-author">
                    <a>
                      <div>
                        <AdvancedImage cldImg={profileImage} />
                        <div>
                          <div>
                            <strong id="post-author-name">
                              {i.user.firstname} {i.user.lastname}
                            </strong>
                          </div>
                          <span>{i.user.Headline}</span>
                        </div>
                        <button className="float-right">Accept</button>
                        <button className="float-right">Decline</button>
                      </div>
                    </a>
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    );
  } else {
    return <div>Loading </div>;
  }
};

export default networkpage;
