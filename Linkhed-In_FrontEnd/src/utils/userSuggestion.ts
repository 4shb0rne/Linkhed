import axios from "axios";
import Cookies from "universal-cookie";
const userSuggestion = async () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const response = await axios.get("http://localhost:8080/getsuggesteduser", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};
export default userSuggestion;
