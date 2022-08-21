import { useState } from "react";
import "../../styles/profileform.scss";

const educationform = () => {
  const [school, setSchool] = useState("");
  return (
    <div>
      <div className="form-input">
        <label>School*</label>
        <div>
          <input
            type="text"
            placeholder="Ex : Boston University"
            className="input-text"
            onChange={(e) => {
              setSchool(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Degree</label>
        <div>
          <input
            type="text"
            placeholder="Ex : Bachelor's"
            className="input-text"
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Field Of Study</label>
        <div>
          <input
            type="text"
            placeholder="Ex : Business"
            className="input-text"
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Start Date</label>
        <div>
          <input type="date" className="input-text"></input>
        </div>
      </div>
      <div className="form-input">
        <label>End Date (or expected)</label>
        <div>
          <input type="date" className="input-text"></input>
        </div>
      </div>
      <div className="form-input">
        <label>Activities and societies</label>
        <div>
          <textarea />
        </div>
      </div>
      <div className="form-input">
        <label>Description</label>
        <div>
          <textarea />
        </div>
      </div>
      <div className="form-input">
        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default educationform;
