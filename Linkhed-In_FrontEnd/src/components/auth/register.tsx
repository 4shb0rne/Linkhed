import "../../styles/auth.scss";

const register = () => {
  return (
    <div>
      <h1 className="text-center mt-6">
        Make the most of your professional life
      </h1>
      <div className="container-register">
        <div className="your-input">
          <div className="input mb-1">
            <label htmlFor="email">Email</label>
            <input type="text" id="email"></input>
          </div>
          <div className="input mb-1">
            <label htmlFor="password">Password (6 or more characters)</label>
            <input type="password" id="password"></input>
          </div>
        </div>
        <button className="register-btn">Agree & Join</button>
        <p className="join-link">
          Already on LinkedIn ?
          <a href="/login" className="join-now">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default register;
