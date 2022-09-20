import axios from "axios";

const getUserEmail = async (email: string) => {
  const response = await axios
    .get("http://localhost:8080/searchuserbyemail/" + email)
    .catch((error) => {
      return error.response;
    });
  return response;
};

export default getUserEmail;
