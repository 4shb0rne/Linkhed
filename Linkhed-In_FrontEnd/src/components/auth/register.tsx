import "../../styles/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"


const register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
const submit = () =>{
  const data = {
    email: email,
    password: password
  }
  axios.post('http://localhost:8080/register', data).then((response)=>{
    const status = response.status
    if(status == 201){ //success
      navigate('/login');
    } 
  })
}
  return (
    <div>
      <h1 className="text-center mt-4">
        Make the most of your professional life
      </h1>
      <div className="container-register">
        <div className="your-input">
          <div className="input mb-1">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" onChange={(e)=>{
              setEmail(e.target.value);
            }}></input>
          </div>
          <div className="input mb-1">
            <label htmlFor="password">Password (6 or more characters)</label>
            <input type="password" id="password" onChange={(e)=>{
              setPassword(e.target.value);
            }}></input>
          </div>
        </div>
        <button className="register-btn" onClick={()=>{
          submit();
        }}>Agree & Join</button>
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
