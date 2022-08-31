import { useParams } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/searchpage.scss";
import Posts from "../components/cards/Posts";
import "../styles/mainpage.scss";
import Userlist from "../components/cards/userlist";
import { useAuth } from "../utils/authContext";
const searchpage = () => {
  const params = useParams();
  const cookies = new Cookies();
  const auth = useAuth()
  const token = cookies.get("token");
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const searchUser = () => {
    const data = {
      content: params.query,
    };
    axios
      .post("http://localhost:8080/searchuser", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUsers(response.data);
      });
  };

  const searchPost = () => {
    const data = {
      content: params.query,
    };
    axios
      .post("http://localhost:8080/searchpost", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setPosts(response.data);
      });
  };

  useEffect(() => {
    searchUser();
    searchPost();
  }, []);
  if(auth.user){
    return (
      <div>
        {users.length != 0 && 
        <div className="box-shadow m-10 mt-1">
          <div className="flex flex-space-between">
            <h1 className="p-3">Users</h1>
          </div>
          { users.map((u) => {
              return <Userlist u={u}></Userlist>;
            })}
        </div>}
        {
          posts.length != 0 &&
          <div className="box-shadow m-10 mt-1">
          <div className="flex flex-space-between">
            <h1 className="p-3">Posts</h1>
          </div>
          <main id="main-section">
            {posts &&
              posts.map((p) => {
                const postImage = cld.image(p.attachment);
                const profileimage = cld.image(p.user.profile_picture);
                var hours = Math.floor(
                  Math.abs(
                    new Date().valueOf() - new Date(p.updated_at).valueOf()
                  ) / 36e5
                );
                return (
                  <Posts
                    key={p.id}
                    p={p}
                    hours={hours}
                    fetch_posts={searchPost}
                    profileimage={profileimage}
                    postImage={postImage}
                  ></Posts>
                );
              })}
          </main>
        </div>}
      </div>
    );
  } else{
    return(
      <div>Loading</div>
    ) 
  }
  
};

export default searchpage;
