import axios from "axios";
import Cookies from "universal-cookie";
const getPost = async (pages: number) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  if (token) {
    const response = await axios.get("http://localhost:8080/posts/" + pages);
    return response.data;
  } else {
    return null;
  }
};

export default getPost;
