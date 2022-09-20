import jwt_decode from "jwt-decode";
import getUserEmail from "./getUserEmail";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const handleGoogle = async (googleData: any) => {
  const navigate = useNavigate();
  const credential: any = jwt_decode(googleData.credential);
  const check = await getUserEmail(credential.email);
  if (check.status == 400) {
    navigate("/googleregister", {
      state: {
        email: credential.email,
        firstname: credential.given_name,
        lastname: credential.family_name,
        picture: credential.picture,
      },
    });
  } else {
    const data = {
      email: credential.email,
    };
    axios.post("http://localhost:8080/googlelogin", data).then((response) => {
      const status = response.status;
      const data = response.data;
      if (status == 200) {
        const cookies = new Cookies();
        const date = new Date();
        date.setTime(date.getTime() + 6 * 60 * 60 * 1000);
        cookies.set("token", data, { path: "/", expires: date });
        navigate("/home");
      }
    });
  }
};

export default handleGoogle;
