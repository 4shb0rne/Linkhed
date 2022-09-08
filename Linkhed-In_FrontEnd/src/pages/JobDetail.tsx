const JobDetail = () => {
  return (
    <div>
      <div className="container-job">
        <h1>Job Details</h1>
        <div className="gap"></div>
        <p>Add Job Description</p>
        <div className="job-input">
          <div className="input mt-2">
            <label htmlFor="jobtitle">Job description *</label>
            <div contentEditable className="input-post" id="post-content"></div>
          </div>
        </div>
        <button className="submit-job-btn">Post</button>
      </div>
    </div>
  );
};

export default JobDetail;
