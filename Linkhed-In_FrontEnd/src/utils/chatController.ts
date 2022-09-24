import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");
export const addChatHistory = (userid: number, otherid: number) => {
  const data = {
    userid: userid,
    otheruserid: otherid,
  };
  const data2 = {
    userid: otherid,
    otheruserid: userid,
  };
  axios.post("http://localhost:8080/addchathistory", data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  axios.post("http://localhost:8080/addchathistory", data2, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const sendMessage = (
  userid: number,
  otherid: number,
  message: string
) => {
  const data = {
    user_id: userid,
    other_id: otherid,
    content: message,
  };
  axios.post("http://localhost:8080/addchat", data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getMessages = async (userId: number, otherId: number) => {
  const message1 = await axios.get(
    "http://localhost:8080/getchats/" + userId + "/" + otherId,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const message2 = await axios.get(
    "http://localhost:8080/getchats/" + otherId + "/" + userId,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = message1.data.concat(message2.data);
  data.sort((a: any, b: any) => a.ID - b.ID);
  console.log(data);
  return data;
};
