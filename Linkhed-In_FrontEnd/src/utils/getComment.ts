import axios from "axios";
import Cookies from "universal-cookie";
const getComment = async (postId: number) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  if (token) {
    const response = await axios.get(
      "http://localhost:8080/comments/" + postId
    );
    return response.data;
  } else {
    return null;
  }
};

export default getComment;
