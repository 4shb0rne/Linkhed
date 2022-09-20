import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/auth.scss";
import { useState } from "react";
const resetpassword = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  return (
    <div className="container-forgot">
      <div className="text">
        <h1>Reset Password</h1>
      </div>
      <div className="your-input">
        <div className="input">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="input">
          <input
            type="password"
            name="repeatpassword"
            id="repeatpassword"
            placeholder="Repeat Password"
            required
          />
        </div>
      </div>
      {error && <div className="text-red">{error}</div>}
      <button
        className="login-btn"
        onClick={() => {
          const password = (
            document.getElementById("password") as HTMLInputElement
          ).value;
          const repeatpassword = (
            document.getElementById("repeatpassword") as HTMLInputElement
          ).value;
          if (password == "" || repeatpassword == "") {
            setError("Password and repeat password must be filled");
          } else if (password != repeatpassword) {
            setError("Password and repeat password must be same");
          } else {
            const temp = {
              password: password,
            };
            axios
              .put("http://localhost:8080/updatepassword", temp, {
                headers: {
                  Authorization: "Bearer " + token,
                },
              })
              .then(() => {
                navigate("/login");
              });
          }
        }}
      >
        Reset Password
      </button>
      <p className="text-center">
        <a href="/" className="back">
          Cancel
        </a>
      </p>
    </div>
  );
};

export default resetpassword;
