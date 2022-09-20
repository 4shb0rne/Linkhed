import axios from "axios";
import Cookies from "universal-cookie";

const getJob = async () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  if (token) {
    const response = await axios.get("http://localhost:8080/getmanagedjobs", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } else {
    return null;
  }
};

export const getAllJobs = async () => {
  const response = await axios.get("http://localhost:8080/getjobs");
  return response.data;
};

export default getJob;
