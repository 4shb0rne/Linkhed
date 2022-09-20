import axios from "axios";
import { useModal } from "../../../utils/modalContext";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const blockmodal = (props: any) => {
  const modal = useModal();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const user = props.user;
  const curruser = props.currentuser;
  const navigate = useNavigate();
  console.log(curruser);
  return (
    <div>
      <div>Are you sure to block this user ?</div>
      <button
        className="yes-btn"
        onClick={() => {
          const data = {
            userid: curruser.id,
            blockid: user.id,
          };
          axios
            .post("http://localhost:8080/blockuser", data, {
              headers: {
                Authorization: "Bearer " + token,
              },
            })
            .then(() => {
              modal.setIsOpen(false);
              console.log(curruser);
              if (curruser.Following.find((o: any) => o.UserID === user.id)) {
                axios.delete(
                  "http://localhost:8080/unfollowuser/" +
                    user.id +
                    "/" +
                    curruser.id,
                  {
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  }
                );
              }

              if (curruser.Connections.find((o: any) => o.id === user.id)) {
                axios.delete(
                  "http://localhost:8080/disconnectuser/" +
                    user.id +
                    "/" +
                    curruser.id,
                  {
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  }
                );
                axios.delete(
                  "http://localhost:8080/disconnectuser/" +
                    curruser.id +
                    "/" +
                    user.id,
                  {
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  }
                );
              }
              props.fetch();
              navigate("/home");
            });
        }}
      >
        Yes
      </button>
      <button
        className="no-btn"
        onClick={() => {
          modal.setIsOpen(false);
        }}
      >
        No
      </button>
    </div>
  );
};

export default blockmodal;
