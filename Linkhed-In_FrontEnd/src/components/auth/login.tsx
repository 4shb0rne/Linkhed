import "../../styles/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submit = () => {
    const data = {
      email: email,
      password: password,
    };
    axios.post("http://localhost:8080/login", data).then((response) => {
      const status = response.status;
      console.log(status);
      if (status == 200) {
        //success
        navigate("/");
      }
    });
  };
  return (
    <div className="container-login">
      <h2>
        LinkedIn
        <span>
          <i className="fab fa-linkedin"></i>
        </span>
      </h2>
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
      </div>
      <a href="#" className="forgot-password-link">
        Forgot Password?
      </a>
      <button
        className="login-btn"
        onClick={() => {
          submit();
        }}
      >
        Sign in
      </button>
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
