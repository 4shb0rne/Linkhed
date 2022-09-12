import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/auth.scss";
import getUserEmail from "../../utils/getUserEmail";
import sendEmail from "../../utils/sendEmail";
const forgetpassword = () => {
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

      <button
        className="login-btn"
        onClick={async () => {
          const email = (document.getElementById("email") as HTMLInputElement)
            .value;
          const user = await getUserEmail(email);
          const token = await axios.get(
            "http://localhost:8080/generatetoken/" + user.id
          );
          sendEmail(
            "Click this link to reset your password => localhost:5173/resetpassword?token=" +
              token.data,
            email
          );
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
