import "../styles/auth.scss";
const JobForm = () => {
  return (
    <div>
      <h1 className="text-center mt-4">Find a great hire, fast</h1>
      <h2 className="text-center">Rated #1 in delivering quality hires</h2>
      <div className="container-register">
        <div className="job-input">
          <div className="input">
            <label htmlFor="jobtitle">Job title *</label>
            <input type="text" id="jobtitle" placeholder="Job title"></input>
          </div>
          <div className="input mt-2">
            <label htmlFor="company">Company *</label>
            {/* <i className="fa fa-building-o icon"></i> */}
            <input type="text" id="company" placeholder="Company"></input>
          </div>
          <div className="input mt-2">
            <label htmlFor="workplace">Workplace type *</label>
            <select>
              <option>On-site</option>
              <option>Hybrid</option>
              <option>Remote</option>
            </select>
          </div>
          <div className="input mt-2">
            <label htmlFor="joblocation">Job Location *</label>
            <input type="text" id="joblocation"></input>
          </div>
          <div className="input mt-2">
            <label htmlFor="employmenttype">Employment type *</label>
            <select>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Temporary</option>
              <option>Volunteer</option>
              <option>Internship</option>
            </select>
          </div>
        </div>
        <button className="login-btn mt-2">Get started for free</button>
      </div>
    </div>
  );
};

export default JobForm;
