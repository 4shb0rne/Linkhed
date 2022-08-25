import axios from "axios";
import "../../styles/addpost.scss";
import { useAuth } from "../../utils/authContext";
import Cookies from "universal-cookie";
import { useModal } from "../../utils/modalContext";
import { useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const addpost = ({ fetch_posts }: any) => {
  const [image, setImage] = useState<FileList | null>(null);
  const auth = useAuth();
  const modal = useModal();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const submit = (content: any) => {
    const formData = new FormData();
    if(image){
      formData.append("file", image![0]);
      formData.append("upload_preset", "linkhed");
      axios
        .post("https://api.cloudinary.com/v1_1/ashbornee/image/upload", formData)
        .then((response) => {
          console.log(response);
          const data = {
            user_id: auth.user.id,
            content: content,
            attachment: response.data.public_id,
          };
          axios
            .post("http://localhost:8080/addpost", data, {
              headers: {
                Authorization: "Bearer " + token,
              },
            })
            .then(() => {
              fetch_posts();
            });
        });
    } else
    {
      const data = {
        user_id: auth.user.id,
        content: content
      };
      axios
        .post("http://localhost:8080/addpost", data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          fetch_posts();
        });
    }
    
  };
  const myImage = cld.image(auth.user.profile_picture);
  return (
    <div>
      <div>
        <AdvancedImage cldImg={myImage} className="profile-img" />
        <p>
          {auth.user.firstname} {auth.user.lastname}
        </p>
      </div>
      <div
        contentEditable
        className="input-post"
        id="post-content"
        data-placeholder="What do you want to talk about"
      ></div>
      <label htmlFor="imgupload">
        <i className="fa fa-picture-o fa-2x"></i>
      </label>
      <input
        type="file"
        id="imgupload"
        className="d-none"
        onChange={(e) => {
          setImage(e.target.files);
          const image: any = document.getElementById("image-test");
          image.className = "image-preview";
          image.src = URL.createObjectURL(e.target.files![0]);
        }}
      ></input>
      <div>
        <img id="image-test"></img>
      </div>
      <div>
        <button
          className="input-btn"
          onClick={() => {
            const content = document.getElementById("post-content")?.innerHTML;
            if (content?.length != 0) {
              submit(content);
              modal.setIsOpen(false);
            }
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};
export default addpost;
