import "../../styles/auth.scss";

const forgetpassword = () => {
  return (
    <div className="container-login">
      <div className="text">
        <h1>Forgot password?</h1>
        <p>Reset password for two quick steps</p>
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
      </div>
      <button className="login-btn">Reset Password</button>
      <p className="text-center">
        <a href="/login" className="back">
          Back
        </a>
      </p>
    </div>
  );
};

export default forgetpassword;
