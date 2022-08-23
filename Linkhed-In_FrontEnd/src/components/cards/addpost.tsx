import "../../styles/addpost.scss";
import { useAuth } from "../../utils/authContext";

const addpost = () => {
  const auth = useAuth();
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
        data-placeholder="What do you want to talk about"
      ></div>
      <div>
        <button>Post</button>
      </div>
    </div>
  );
};

export default addpost;
