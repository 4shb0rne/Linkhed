import axios from "axios";
import Cookies from "universal-cookie";
import { addNotification } from "./NotificationController";

const updateView = (user: any, curruser: any) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  axios.get(
    "http://localhost:8080/updateprofileview/" +
      user.id +
      "/" +
      (user.ProfileVisited + 1),
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const temp = {
    user_id: user.id,
    content: `<b>${curruser.firstname} ${curruser.lastname}</b> viewed your profile`,
    actor_id: curruser.id,
  };
  addNotification(temp);
};

export default updateView;
