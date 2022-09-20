import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.scss";
import getUserEmail from "../../utils/getUserEmail";
import sendEmail from "../../utils/sendEmail";

const forgetpassword = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div className="container-forgot">
      <div className="text">
        <h1>Forgot password?</h1>
        <p>Reset password for two quick steps</p>
      </div>
      <div className="your-input">
        <div className="input">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>
      </div>
      {error && <div className="text-red">{error}</div>}
      {message && <div className="text-green">{message}</div>}
      <button
        className="login-btn"
        onClick={async () => {
          setError("");
          setMessage("");
          const email = (document.getElementById("email") as HTMLInputElement)
            .value;
          if (email == "") {
            setError("Email must be filled");
          } else {
            await getUserEmail(email).then(async (response) => {
              if (response.status != 400) {
                const token = await axios.get(
                  "http://localhost:8080/generatetoken/" + response.data.id
                );
                sendEmail(
                  "Click this link to reset your password => localhost:5173/resetpassword?token=" +
                    token.data,
                  email
                );
                setMessage("Check your email for link to reset your password");
              } else {
                setError("Account with that email doesn't exist");
              }
            });
          }
        }}
      >
        Reset Password
      </button>
      <p className="text-center">
        <Link to="/login" className="back">
          Back
        </Link>
      </p>
    </div>
  );
};

export default forgetpassword;
