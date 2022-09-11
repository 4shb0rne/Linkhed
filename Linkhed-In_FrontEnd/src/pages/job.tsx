import { useNavigate } from "react-router-dom";

const job = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div id="left-aside-wrapper">
        <aside id="left-aside">
          <div className="box-shadow p-1">
            <div className="network-menu p-menu">
              <div>
                <i className="fa fa-bookmark p-1"></i>My Job
              </div>
              <div>
                <i className="fa fa-bell p-1"></i>Job alerts
              </div>
              <div>
                <i className="fa fa-money p-1"></i>Salary
              </div>
            </div>
          </div>
          <div className="box-shadow p-1">
            <div className="network-menu p-menu">
              <div>
                <button
                  className="job-post-btn"
                  onClick={() => {
                    navigate("/jobform");
                  }}
                >
                  <i className="fa fa-pencil-square-o"></i>
                  <span className="span-ml-3">Post a free job</span>
                </button>
              </div>
              <div
                className="mt-1"
                onClick={() => {
                  navigate("/managejob");
                }}
              >
                <i className="fa fa-suitcase"></i>
                <span className="manage-job-menu">Manage job posts</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <div id="main-wrapper">
        <main id="main-section"></main>
      </div>
    </div>
  );
};

export default job;
