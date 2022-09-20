import "../../styles/auth.scss";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
interface LocationState {
  state: {
    email: string;
    firstname: string;
    lastname: string;
    picture: string;
  };
}
const googleregister = () => {
  const navigate = useNavigate();
  const location = useLocation() as LocationState;
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const submit = () => {
    if (password == repeatPassword && password != "") {
      const formData = new FormData();
      formData.append("file", location.state.picture);
      formData.append("upload_preset", "linkhed");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/ashbornee/image/upload",
          formData
        )
        .then((response) => {
          const data = {
            email: location.state.email,
            password: password,
            firstname: location.state.firstname,
            lastname: location.state.lastname,
            profile_picture: response.data.public_id,
          };
          axios
            .post("http://localhost:8080/registergoogle", data)
            .then((response) => {
              const status = response.status;
              if (status == 201) {
                const data = {
                  email: location.state.email,
                };
                axios
                  .post("http://localhost:8080/googlelogin", data)
                  .then((response) => {
                    const status = response.status;
                    const data = response.data;
                    if (status == 200) {
                      const cookies = new Cookies();
                      const date = new Date();
                      date.setTime(date.getTime() + 6 * 60 * 60 * 1000);
                      cookies.set("token", data, { path: "/", expires: date });
                      setError("");
                      navigate("/home");
                    }
                  });
              } else {
                console.log("invalid");
              }
            });
        });
    } else if (password == "" || repeatPassword == "") {
      setError("Password or Repeat Password must be filled");
    } else {
      setError("Password and Repeat password must be same");
    }
  };
  return (
    <div>
      <div className="container-register">
        <div className="your-input">
          <div className="input mt-2">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              id="email"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className="input mt-2">
            <label htmlFor="password">Repeat Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
            ></input>
          </div>
        </div>
        {error && <div className="text-red mt-2">{error}</div>}
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

export default googleregister;
