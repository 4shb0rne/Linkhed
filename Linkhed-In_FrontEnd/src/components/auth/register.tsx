import "../../styles/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import getUserEmail from "../../utils/getUserEmail";
import Cookies from "universal-cookie";

const register = () => {
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
        <div className="text-center">or</div>
        <GoogleLogin onSuccess={handleGoogle}></GoogleLogin>
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
