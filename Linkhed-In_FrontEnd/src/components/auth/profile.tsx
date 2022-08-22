import { useState } from "react";
import "../../styles/profile.scss";
import Modal from "../cards/modal";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { useAuth } from "../../utils/authContext";
import EducationForm from "../cards/educationform";
import Cookies from "universal-cookie";
import axios from "axios";
import ProfileForm from "../cards/profileform";
import { useModal } from "../../utils/modalContext";
const profile = () => {
  const auth = useAuth();
  const modal = useModal();
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });

  const cookies = new Cookies();
  const token = cookies.get("token");
  const uploadImage = (image: any) => {
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "linkhed");
    axios
      .post("https://api.cloudinary.com/v1_1/ashbornee/image/upload", formData)
      .then((response) => {
        const picture = {
          profile_picture: response.data.public_id,
        };
        axios
          .post(
            "http://localhost:8080/updateprofilepicture/" + auth.user.id,
            picture,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            auth.login(res.data);
          });
      });
  };
  const uploadBackgroundImage = (image: any) => {
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "linkhed");
    axios
      .post("https://api.cloudinary.com/v1_1/ashbornee/image/upload", formData)
      .then((response) => {
        const picture = {
          background_picture: response.data.public_id,
        };
        axios
          .post(
            "http://localhost:8080/updatebackgroundpicture/" + auth.user.id,
            picture,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            auth.login(res.data);
          });
      });
  };
  const [addeducationmodal, setAddEducationModal] = useState(false);
  if (auth.user) {
    const myImage = cld.image(auth.user.profile_picture);
    const myBackgroundImage = cld.image(auth.user.background_picture);
    myImage.resize(fill().width(250).height(250));
    return (
      <div>
        <div className="box-shadow m-10">
          <Modal
            modal={modal.isOpen}
            setModal={modal.setIsOpen}
            ariaText="Profile Settings"
          >
            <ProfileForm></ProfileForm>
          </Modal>
          <Modal
            modal={addeducationmodal}
            setModal={setAddEducationModal}
            ariaText="Add Education"
          >
            <EducationForm></EducationForm>
          </Modal>
          <div id="profile-upper">
            <div id="profile-banner-image">
              <label htmlFor="backgroundupload">
                <AdvancedImage cldImg={myBackgroundImage} />
              </label>
              <input
                type="file"
                id="backgroundupload"
                className="d-none"
                onChange={(e) => {
                  uploadBackgroundImage(e.target.files);
                }}
              ></input>
            </div>
            <div id="profile-d">
              <div id="profile-pic">
                <label htmlFor="imgupload">
                  <AdvancedImage cldImg={myImage} />
                </label>
                <input
                  type="file"
                  id="imgupload"
                  className="d-none"
                  onChange={(e) => {
                    uploadImage(e.target.files);
                  }}
                ></input>
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
            <div className="flex flex-space-between mt-5">
              <h1>
                {auth.user.firstname} {auth.user.lastname}
              </h1>
              <button
                className="btn-none"
                onClick={() => {
                  modal.setIsOpen(true);
                }}
              >
                <i className="fa fa-pencil"></i>
              </button>
            </div>
          </div>
          <div className="flex ml-5">{auth.user.Headline}</div>
          <div className="flex ml-5">
            {auth.user.City}
            {auth.user.City && ","} {auth.user.Country}
          </div>
        </div>
        <div className="box-shadow m-10 mt-1">
          <div className="flex flex-space-between">
            <h1 className="p-3">Education</h1>
            <button
              className="btn-none"
              onClick={() => {
                setAddEducationModal(true);
              }}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default profile;
