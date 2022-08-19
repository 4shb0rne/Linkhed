import "../../styles/footer.scss";

const footer = () => {
  return (
    <div className="footer">
  <div className="inner-footer">

    <div className="footer-items">
      <h1>Company Name</h1>
      <p>Description of any product or motto of the company.</p>
    </div>

    <div className="footer-items">
      <h3>Quick Links</h3>
      <div className="border1"></div>
        <ul>
          <a href="#"><li>Home</li></a>
          <a href="#"><li>Search</li></a>
          <a href="#"><li>Contact</li></a>
          <a href="#"><li>About</li></a>
        </ul>
    </div>
    <div className="footer-items">
      <h3>Recipes</h3>
      <div className="border1"></div>
        <ul>
          <a href="#"><li>Indian</li></a>
          <a href="#"><li>Chinese</li></a>
          <a href="#"><li>Mexican</li></a>
          <a href="#"><li>Italian</li></a>
        </ul>
    </div>
    <div className="footer-items">
      <h3>Contact us</h3>
      <div className="border1"></div>
        <ul>
          <li><i className="fa fa-map-marker" aria-hidden="true"></i>XYZ, abc</li>
          <li><i className="fa fa-phone" aria-hidden="true"></i>123456789</li>
          <li><i className="fa fa-envelope" aria-hidden="true"></i>xyz@gmail.com</li>
        </ul> 
      
        <div className="social-media">
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-google-plus-square"></i></a>
        </div> 
    </div>
  </div>
  <div className="footer-bottom">
    Copyright &copy; Food and Burps 2020.
  </div>
</div>
  );
};

export default footer;
