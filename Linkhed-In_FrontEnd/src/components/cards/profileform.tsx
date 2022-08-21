import { useAuth } from "../../utils/auth";

const profileform = () => {
  const auth = useAuth();
  return (
    <div>
      <div className="form-input">
        <label>First name*</label>
        <div>
          <input
            type="text"
            placeholder="First name"
            className="input-text"
            value={auth.user.firstname}
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Last name*</label>
        <div>
          <input
            type="text"
            placeholder="Last name"
            className="input-text"
            value={auth.user.lastname}
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Headline*</label>
        <div>
          <input
            type="text"
            placeholder="Headline"
            className="input-text"
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Industry*</label>
        <div>
          <input
            type="text"
            placeholder="Ex: Retail"
            className="input-text"
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Country/Region</label>
        <div>
          <input
            type="text"
            placeholder="Ex: United States"
            className="input-text"
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>City</label>
        <div>
          <input type="text" className="input-text"></input>
        </div>
      </div>
      <div className="form-input">
        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default profileform;
