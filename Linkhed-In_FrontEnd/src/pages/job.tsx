import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../utils/getJob";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useState } from "react";
import "../styles/jobs.scss";
const job = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const fetch_jobs = async () => {
    const job = await getAllJobs();
    setJobs(job);
  };
  useEffect(() => {
    fetch_jobs();
  }, []);
  if (jobs) {
    return (
      <div className="container">
        <div id="left-aside-wrapper">
          <aside id="left-aside">
            <div className="box-shadow p-1">
              <div className="network-menu p-menu">
                <div>
                  <i className="fa fa-bookmark p-1 left-menu-p"></i>My Job
                </div>
                <div>
                  <i className="fa fa-bell p-1 left-menu-p"></i>Job alerts
                </div>
                <div>
                  <i className="fa fa-money p-1 left-menu-p"></i>Salary
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
                    <span className="span-ml-3 btn-text">Post a free job</span>
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
          <main id="main-section">
            {jobs &&
              jobs.map((j: any) => {
                const profileImage = cld.image(j.JobPicture);
                return (
                  <article key={j.id}>
                    <div id="post-author">
                      <a>
                        <div>
                          <AdvancedImage cldImg={profileImage} />
                          <div>
                            <div>
                              <strong className="job-title">
                                {j.JobTitle}
                              </strong>
                            </div>
                            <span>{j.JobDescription}</span>
                            <span>
                              {j.JobLocation} ({j.WorkplaceType})
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </article>
                );
              })}
          </main>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default job;
