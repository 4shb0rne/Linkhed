import "../../styles/auth.scss";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import sendEmail from "../../utils/sendEmail";

interface LocationState {
  state: {
    email: string;
    password: string;
  };
}
const registerdata = () => {
  const navigate = useNavigate();
  const location = useLocation() as LocationState;
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const submit = () => {
    const data = {
      email: location.state.email,
      password: location.state.password,
      firstname: firstname,
      lastname: lastname,
    };
    axios.post("http://localhost:8080/register", data).then((response) => {
      const status = response.status;
      const responsedata = response.data;
      if (status == 201) {
        //success
        sendEmail(
          "Your Verification Code : " + responsedata.VerificationCode,
          responsedata.email
        );
        navigate("/verificationcode", {
          state: {
            responsedata: responsedata,
          },
        });
      } else {
        console.log("invalid");
      }
    });
  };
  return (
    <div>
      <div className="container-register">
        <div className="your-input">
          <div className="input mt-2">
            <label htmlFor="email">First Name</label>
            <input
              type="text"
              id="email"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></input>
          </div>
          <div className="input mt-2">
            <label htmlFor="password">Last Name</label>
            <input
              type="text"
              id="password"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <button
          className="register-btn"
          onClick={() => {
            submit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default registerdata;
