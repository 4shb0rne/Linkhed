import "../../styles/header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import getUser from "../../utils/getUser";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const navbar = () => {
  const [user, setUser] = useState(null);
  const fetch_user = async () => {
    const User = await getUser();
    setUser(User);
  };
  useEffect(() => {
    fetch_user();
  }, []);
  if (!user) {
    return (
      <div className="nav">
        <input type="checkbox" id="nav-check" />
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
  } else {
    //home selected
    return (
      <header id="main-header">
        <div>
          <div>
            <img id="header-logo" src="linkedin.png" alt="LinkedIn" />
            <img
              id="header-picture-menu"
              src="mongo.jpeg"
              alt="Profile picture"
            />
            <span id="header-picture-menu-bars">
              <span className="fas fa-bars"></span>
            </span>
            <div>
              <input id="search" type="text" placeholder="         Search" />
              <span id="search-icon" className="fas fa-search"></span>
              <span id="search-button" className="fas fa-search"></span>
            </div>
            <span className="fas fa-comments"></span>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/" className="text-white">
                  <div className="header_logo">
                    <span className="fas fa-home"></span>
                    <span className="nav-item-text">Home</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white">
                  <div className="header_logo">
                    <span className="fas fa-user-friends"></span>
                    <span className="nav-item-text">My Network</span>
                  </div>
                </Link>
              </li>
              <li>
                <div className="header_logo">
                  <span className="fas fa-suitcase"></span>
                  <span className="nav-item-text">Jobs</span>
                </div>
              </li>
              <li>
                <div className="header_logo">
                  <span className="fas fa-envelope"></span>
                  <span className="nav-item-text">Messaging</span>
                </div>
              </li>
              <li>
                <div className="header_logo">
                  <span className="fas fa-bell"></span>
                  <span className="nav-item-text">Notifications</span>
                </div>
              </li>
              <li>
                <div
                  className="header_logo"
                  onClick={() => {
                    const cookies = new Cookies();
                    cookies.remove("token");
                    setUser(null);
                  }}
                >
                  <span className="fa fa-sign-out"></span>
                  <span className="nav-item-text">Logout</span>
                </div>
              </li>
              <li>
                <div id="right-border">
                  <img src="mongo.jpeg" alt="Profile picture" />
                  <span className="nav-item-text">Profile</span>
                </div>
              </li>
              <li>
                <div>
                  <span className="fas fa-th"></span>
                  <span className="nav-item-text">
                    Work<span className="fas fa-caret-down"> </span>
                  </span>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
};

export default navbar;
