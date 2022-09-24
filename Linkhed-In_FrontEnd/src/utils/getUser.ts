import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");
const getUser = async () => {
  if (token) {
    const response = await axios.get("http://localhost:8080/getuser", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } else {
    return null;
  }
};

export default getUser;
