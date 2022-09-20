import "../../styles/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import getUserEmail from "../../utils/getUserEmail";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleGoogle = async (googleData: any) => {
    const credential: any = jwt_decode(googleData.credential);
    const check = await getUserEmail(credential.email);
    if (check.status == 400) {
      navigate("/googleregister", {
        state: {
          email: credential.email,
          firstname: credential.given_name,
          lastname: credential.family_name,
          picture: credential.picture,
        },
      });
    } else {
      const data = {
        email: credential.email,
      };
      axios.post("http://localhost:8080/googlelogin", data).then((response) => {
        const status = response.status;
        const data = response.data;
        if (status == 200) {
          const cookies = new Cookies();
          const date = new Date();
          date.setTime(date.getTime() + 6 * 60 * 60 * 1000);
          cookies.set("token", data, { path: "/", expires: date });
          navigate("/home");
        }
      });
    }
  };
  const submit = async () => {
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8080/login", data)
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
      })
      .catch(() => {
        setError("Email or password is wrong");
      });
  };
  return (
    <div className="container-login">
      <h2>LinkedIn</h2>
      <div className="text">
        <h1>Sign in</h1>
        <p>Stay updated on your professional world</p>
      </div>
      <div className="your-input">
        <div className="input">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {error && <div className="text-red">{error}</div>}
      </div>
      <Link className="forgot-password-link" to="/forgetpassword">
        Forgot Password?
      </Link>
      <button
        className="login-btn"
        onClick={() => {
          submit();
        }}
      >
        Sign in
      </button>
      <div className="text-center">or</div>
      <GoogleLogin onSuccess={handleGoogle}></GoogleLogin>
      <p className="join-link">
        New to linkedin?
        <Link to={"/register"} className="join-now">
          Join now
        </Link>
      </p>
    </div>
  );
};

export default login;
