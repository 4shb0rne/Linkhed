import parse from "html-react-parser";
import { decode } from "html-entities";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const replies = (props: any) => {
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
      </div>
    </div>
  );
};

export default replies;
