import "../../styles/footer.scss";

const footer = () => {
  return (
    <div className="footer">
      <div className="inner-footer">
        <div className="footer-items">
          <img src="linkedinlogo.png" />
        </div>

        <div className="footer-items">
          <h3>Quick Links</h3>
          <div className="border1"></div>
          <ul>
            <a href="#">
              <li>Home</li>
            </a>
            <a href="#">
              <li>Search</li>
            </a>
            <a href="#">
              <li>Contact</li>
            </a>
            <a href="#">
              <li>About</li>
            </a>
            <a>
              <li>Terms & Services</li>
            </a>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">Copyright &copy; LinkhedIn 2022.</div>
    </div>
  );
};

export default footer;
