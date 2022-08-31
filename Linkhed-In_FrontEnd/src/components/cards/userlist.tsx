import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import getUser from "../../utils/getUser";
import { useAuth } from "../../utils/authContext";

const userlist = (props: any) => {
  const cookies = new Cookies();
  const auth = useAuth();
  const token = cookies.get("token");
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const fetch_user = async () => {
    const User = await getUser();
    auth.login(User);
  };

  const checkConnect = () => {
    if (auth.user) {
      if (auth.user.Connections.find((o: any) => o.id === props.u.id)) {
        console.log("True");
        return true;
      } else {
        return false;
      }
    }
    fetch_user();
    return false;
  };

  const [connect, setConnect] = useState(checkConnect());
  const Image = cld.image(props.u.profile_picture);

  useEffect(() => {
    fetch_user();
    setConnect(checkConnect());
  }, []);
  if (auth.user) {
    return (
      <div id="post-author">
        <a>
          <div>
            <AdvancedImage cldImg={Image} />
            <div>
              <div>
                <strong id="post-author-name">
                  {props.u.firstname} {props.u.lastname}
                </strong>
              </div>
              <span>{props.u.Headline}</span>
              <span>
                {props.u.City}, {props.u.Country}
              </span>
            </div>
          </div>
        </a>
        {connect == false ? (
          <button
            className="connect-btn"
            onClick={() => {
              const data1 = {
                userid: auth.user.id,
                connectionid: props.u.id,
              };
              const data2 =  {
                userid: props.u.id,
                connectionid: auth.user.id,
              }
              axios.post("http://localhost:8080/connectuser", data1, {
                headers: {
                  Authorization: "Bearer " + token,
                },
              });
              axios.post("http://localhost:8080/connectuser", data2, {
                headers: {
                  Authorization: "Bearer " + token,
                },
              });
              setConnect(true);
            }}
          > 
            Connect
          </button>
        ) : (
          <button
            className="connect-btn"
            onClick={() => {
              axios.delete(
                "http://localhost:8080/disconnectuser/"+props.u.id+"/"+auth.user.id,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              );
              axios.delete(
                "http://localhost:8080/disconnectuser/"+auth.user.id+"/"+props.u.id,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              );
              setConnect(false);
            }}
          >
            Delete Connection 
          </button>
        )}
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default userlist;