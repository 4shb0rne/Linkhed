import axios from "axios";
import "../../styles/addpost.scss";
import { useAuth } from "../../utils/authContext";
import Cookies from "universal-cookie";
import { useModal } from "../../utils/modalContext";
import { useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const addpost = ({fetch_posts} : any) => {
  const [image, setImage] = useState(null)
  const [imageId, setImageId] = useState('');
  const auth = useAuth();
  const modal = useModal();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const uploadImage = () => {
    const formData = new FormData();
    console.log(image[0])
    formData.append("file", image[0]);
    formData.append("upload_preset", "linkhed");
    axios
      .post("https://api.cloudinary.com/v1_1/ashbornee/image/upload", formData)
      .then((response) => {
        console.log(response)
    })};
  const submit = (content : any) =>{
    // uploadImage()
    // const data = {
    //   author_id: auth.user.id,
    //   content: content,
    //   attachment: imageId
    // }
    // axios.post("http://localhost:8080/addpost", data, {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // }).then(()=>{
    //   fetch_posts()
    // })
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
        id="content-post"
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
          setImage(e.target.files)
        }}
         ></input>
      <div>
        <button className="input-btn" onClick={()=>{
          const content = document.getElementById("content-post")?.innerHTML;
          if(content?.length != 0){
            submit(content);
            modal.setIsOpen(false)
          }
        }}>Post</button>
      </div>
    </div>
  );
};
export default addpost;
