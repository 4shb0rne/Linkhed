import "../../styles/auth.scss";

const resetpassword = () => {
  return (
    <div className="container-login">
      <div className="text">
        <h1>Reset Password</h1>
      </div>
      <div className="your-input">
        <div className="input">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="input">
          <input
            type="password"
            name="repeatpassword"
            id="repeatpassword"
            placeholder="Repeat Password"
            required
          />
        </div>
      </div>
      <button className="login-btn">Reset Password</button>
      <p className="text-center">
        <a href="/" className="back">
          Cancel
        </a>
      </p>
    </div>
  );
};

export default resetpassword;
