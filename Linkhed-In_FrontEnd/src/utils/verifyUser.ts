import axios from "axios";

const verifyUser = async (userId: number) => {
  const response = await axios.put(
    "http://localhost:8080/updateverified/" + userId
  );
  return response.data;
};

export default verifyUser;
