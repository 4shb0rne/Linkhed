import "../../styles/profileform.scss";

const educationform = () => {
  return (
    <div>
      <div className="form-input">
        <label>School*</label>
        <div>
          <input
            type="text"
            placeholder="Ex : Boston University"
            className="input-text"
            id="school"
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Degree*</label>
        <div>
          <input
            type="text"
            placeholder="Ex : Bachelor's"
            className="input-text"
            id="degree"
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Field Of Study*</label>
        <div>
          <input
            type="text"
            placeholder="Ex : Business"
            className="input-text"
            id="fieldofstudy"
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Start Date*</label>
        <div>
          <input type="date" className="input-text" id="startdate"></input>
        </div>
      </div>
      <div className="form-input">
        <label>End Date (or expected)*</label>
        <div>
          <input type="date" className="input-text" id="enddate"></input>
        </div>
      </div>
      <div className="form-input">
        <label>Activities and societies</label>
        <div>
          <textarea id="activities" />
        </div>
      </div>
      <div className="form-input">
        <label>Description</label>
        <div>
          <textarea id="description" />
        </div>
      </div>
      <div className="form-input">
        <button
          className="submit-btn"
          onSubmit={() => {
            const school = document.getElementById("school");
            const degree = document.getElementById("degree");
            const fieldofstudy = document.getElementById("fieldofstudy");
            const startdate = document.getElementById("startdate");
            const enddate = document.getElementById("enddate");
            const activities = document.getElementById("activities");
            const description = document.getElementById("description");
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default educationform;
