import "../../styles/header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import getUser from "../../utils/getUser";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
const navbar = () => {
  const [user, setUser] = useState(null);
  const fetch_user = async() =>{
    const User = await getUser()  
    setUser(User)
  }
  useEffect(()=>{
    fetch_user()
  }, [])
  return (
    <div className="nav">
  <input type="checkbox" id="nav-check"/>
  <div className="nav-header">
    <div className="nav-title">
    <FontAwesomeIcon icon={faLinkedin} />
    </div>
  </div>
  <div className="nav-btn">
    <label htmlFor="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div className="nav-links">

    <Link to="/login">Sign Up</Link>
    <Link to="/register">Register</Link>
  </div>
</div>
  );
};

export default navbar;
