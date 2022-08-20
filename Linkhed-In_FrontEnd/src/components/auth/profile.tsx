import { useState } from "react";
import "../../styles/profile.scss";
import Modal from "../cards/modal";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
const profile = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const [modal, setModal] = useState(false);
  const myImage = cld.image("blank_bjt7w5.png");
  myImage.resize(fill().width(250).height(250));
  return (
    <div className="box-shadow m-10">
      <Modal modal={modal} setModal={setModal} ariaText="Profile Settings">
        <div>TEST</div>
      </Modal>
      <div id="profile-upper">
        <div id="profile-banner-image">
          <img src="noelle.jfif" alt="Banner image" />
        </div>
        <div id="profile-d">
          <div id="profile-pic">
            <AdvancedImage cldImg={myImage} />
          </div>
          <div className="tb" id="m-btns">
            <div className="td"></div>
            <div className="td"></div>
          </div>
          <div id="edit-profile"></div>
        </div>
        <div id="black-grd"></div>
      </div>
      <div>
        <div className="flex flex-space-between mt-5">
          <h1>Nilou</h1>
          <button
            className="btn-none"
            onClick={() => {
              setModal(true);
            }}
          >
            <i className="fa fa-pencil"></i>
          </button>
        </div>
      </div>
      <div className="flex mt-2">Student At Binus University</div>
    </div>
  );
};

export default profile;
