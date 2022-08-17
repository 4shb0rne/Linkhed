import "../../styles/header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
const navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <FontAwesomeIcon icon={faLinkedin} />
      </div>
      <ul className="nav-links">
        <div className="menu">
          <li>
            <a href="/">Discover</a>
          </li>
          <li>
            <a href="/">People</a>
          </li>
          <li>
            <a href="/">Learning</a>
          </li>
          <li>
            <a href="/">Jobs</a>
          </li>
          <li>
            <a href="/login">Sign in</a>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default navbar;
