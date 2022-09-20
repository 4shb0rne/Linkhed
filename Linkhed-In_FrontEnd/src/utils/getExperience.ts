import axios from "axios";
import Cookies from "universal-cookie";

const getExperience = async (userId: number) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  if (token) {
    const response = await axios.get(
      "http://localhost:8080/experiences/" + userId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } else {
    return null;
  }
};

export const getMonth = (month: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month - 1];
};

export default getExperience;
