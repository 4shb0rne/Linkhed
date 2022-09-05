import parse from "html-react-parser";
import { decode } from "html-entities";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import Cookies from "universal-cookie";
import { useAuth } from "../../utils/authContext";
const replies = (props: any) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const auth = useAuth();
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const data = props.data;
  const replyImage = cld.image(data.User.profile_picture);
  return (
    <div className="reply-card">
      <div key={data.id}>
        <div id="post-author">
          <a href="#">
            <div>
              <AdvancedImage cldImg={replyImage} />
              <div>
                <div>
                  <strong id="post-author-name">
                    {data.User.firstname} {data.User.lastname}
                  </strong>
                </div>
                <span>{data.User.Headline}</span>
              </div>
            </div>
          </a>
        </div>
        <div id="post-data">
          <div>{parse(decode(data.content))}</div>
        </div>
        <div id="post-interactions">
          <div id="interactions-btns">
            {auth.user.id == data.User.id && (
              <button
                onClick={() => {
                  axios.delete("http://localhost:8080/deletereply/" + data.id, {
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  });
                  props.fetch_posts();
                }}
              >
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default replies;
