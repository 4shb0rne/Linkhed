import "../../styles/footer.scss";

const footer = () => {
  return (
    <div className="footer">
      <div className="contain">
        <div className="col">
          <ul>
            <li>
              <img src="../../../public/linkedinlogo.png" />
            </li>
          </ul>
        </div>
        <div className="col">
          <h1>General</h1>
          <ul>
            <li>Sign up</li>
            <li>Help Center</li>
            <li>About</li>
            <li>Press</li>
            <li>Blog</li>
            <li>Careers</li>
            <li>Developers</li>
          </ul>
        </div>
        <div className="col">
          <h1>Browse LinkedIn</h1>
          <ul>
            <li>Learning</li>
            <li>Jobs</li>
            <li>Salary</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className="col">
          <h1>Business Solution</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className="col">
          <h1>Directories</h1>
          <ul>
            <li>Members</li>
            <li>Jobs</li>
            <li>Companies</li>
            <li>Featured</li>
            <li>Learning</li>
            <li>Posts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default footer;
