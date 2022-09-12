import axios from "axios";

const getUserEmail = async (email: string) => {
  const response = await axios.get(
    "http://localhost:8080/searchuserbyemail/" + email
  );
  return response.data;
};

export default getUserEmail;
