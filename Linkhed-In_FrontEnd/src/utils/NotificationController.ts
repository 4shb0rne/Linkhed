import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");

export const getNotifications = async (id: number) => {
  const response = await axios.get(
    "http://localhost:8080/getnotification/" + id,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const addNotification = async (data: any) => {
  axios
    .post("http://localhost:8080/addnotification", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      console.log(response)
      return response.data;
    });
};
