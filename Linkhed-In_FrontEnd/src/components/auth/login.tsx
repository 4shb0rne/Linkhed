import "../../styles/auth.scss";

const login = () => {
  return (
    <div className="container-login">
      <h2>
        LinkedIn
        <span>
          <i className="fab fa-linkedin"></i>
        </span>
      </h2>
      <div className="text">
        <h1>Sign in</h1>
        <p>Stay updated on your professional world</p>
      </div>
      <div className="your-input">
        <div className="input">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="input">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
      </div>
      <a href="#" className="forgot-password-link">
        Forgot Password?
      </a>
      <button className="login-btn">Sign in</button>
      <p className="join-link">
        New to linkedin?
        <a href="/register" className="join-now">
          Join now
        </a>
      </p>
    </div>
  );
};

export default login;
