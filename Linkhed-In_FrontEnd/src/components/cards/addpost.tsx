import axios from "axios";
import "../../styles/addpost.scss";
import { useAuth } from "../../utils/authContext";
import Cookies from "universal-cookie";
import { useModal } from "../../utils/modalContext";
import { useState } from "react";


const addpost = ({fetch_posts} : any) => {
  const [image, setImage] = useState('')
  const auth = useAuth();
  const modal = useModal();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const submit = (content : any) =>{
    const data = {
      author_id: auth.user.id,
      content: content
    }
    console.log(data)
    axios.post("http://localhost:8080/addpost", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  }
  return (
    <div>
      <div>
        <img src="blank.png" className="profile-img"></img>
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
        onChange={(e) => {}}
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
