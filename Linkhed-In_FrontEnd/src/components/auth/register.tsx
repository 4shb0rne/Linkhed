import "../../styles/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const submit = () => {
    axios.get("http://localhost:8080/users").then((response) => {
      if (
        response.data.find((o: any) => o.email == email) == null &&
        password != ""
      ) {
        navigate("/registerdata", {
          state: {
            email: email,
            password: password,
          },
        });
      } else {
        setError("Email must be unique and password must be filled");
      }
    });
  };
  return (
    <div>
      <h1 className="text-center mt-4">
        Make the most of your professional life
      </h1>
      <div className="container-register">
        <div className="your-input">
          <div className="input mt-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="input mt-2">
            <label htmlFor="password">Password (6 or more characters)</label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
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
          Agree & Join
        </button>
        <p className="join-link">
          Already on LinkedIn ?
          <Link to={"/login"} className="join-now">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default register;
