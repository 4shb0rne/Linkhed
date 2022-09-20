import "../../styles/header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import getUser from "../../utils/getUser";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/authContext";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { googleLogout } from "@react-oauth/google";
const navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const fetch_user = async () => {
    const User = await getUser();
    auth.login(User);
  };
  useEffect(() => {
    fetch_user();
  }, []);
  if (!auth.user) {
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
          <Link to="/login">Sign In</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    );
  } else {
    const myImage = cld.image(auth.user.profile_picture);
    //home selected
    return (
      <header id="main-header">
        <div>
          <div>
            <img id="header-logo" src="/linkedin.png" alt="LinkedIn" />
            <div>
              <form
                onSubmit={() => {
                  const data = (
                    document.getElementById("search") as HTMLInputElement
                  ).value;
                  navigate(`/search/${data}`);
                }}
              >
                <input id="search" type="text" placeholder="Search" />
              </form>
              <span id="search-icon" className="fas fa-search"></span>
              <span id="search-button" className="fas fa-search"></span>
            </div>
            <span className="fas fa-comments"></span>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/home">
                  <div className="header_logo">
                    <span className="fas fa-home"></span>
                    <span className="nav-item-text">Home</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/networkpage">
                  <div className="header_logo">
                    <span className="fas fa-user-friends"></span>
                    <span className="nav-item-text">My Network</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/job">
                  <div className="header_logo">
                    <span className="fas fa-suitcase"></span>
                    <span className="nav-item-text">Jobs</span>
                  </div>
                </Link>
              </li>
              <li>
                <div className="header_logo">
                  <span className="fas fa-envelope"></span>
                  <span className="nav-item-text">Messaging</span>
                </div>
              </li>
              <li>
                <Link to="/notification">
                  <div className="header_logo">
                    <span className="fas fa-bell"></span>
                    <span className="nav-item-text">Notifications</span>
                  </div>
                </Link>
              </li>
              <li>
                <div
                  className="header_logo"
                  onClick={() => {
                    const cookies = new Cookies();
                    cookies.remove("token");
                    auth.logout();
                    googleLogout();
                    navigate("/");
                  }}
                >
                  <span className="fa fa-sign-out"></span>
                  <span className="nav-item-text">Logout</span>
                </div>
              </li>
              <li>
                <Link to="/profile">
                  <div id="right-border">
                    <AdvancedImage cldImg={myImage} />
                    <span className="nav-item-text">Profile</span>
                  </div>
                </Link>
              </li>
              <li>
                <div>
                  <span className="fas fa-th"></span>
                  <span className="nav-item-text">
                    Work
                    <span className="fas fa-caret-down"> </span>
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
