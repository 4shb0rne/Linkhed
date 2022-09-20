import "../styles/jobs.scss";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useAuth } from "../utils/authContext";
import { useEffect, useState } from "react";
import getJob from "../utils/getJob";

const managejob = () => {
  const auth = useAuth();
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  const [jobs, setJobs] = useState<any[]>([]);

  const fetch_jobs = async () => {
    const job = await getJob();
    setJobs(job);
    console.log(job);
  };
  useEffect(() => {
    fetch_jobs();
  }, []);
  if (auth.user) {
    return (
      <div className="container">
        <div id="left-aside-wrapper">
          <aside id="left-aside">
            <div className="box-shadow p-1">
              <div className="network-menu p-menu">
                <div>
                  <i className="fa fa-bookmark p-1"></i>My Items
                </div>
                <div>
                  <i className="fa fa-bell p-1"></i>Posted jobs
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div id="main-wrapper">
          <main id="main-section">
            <div className="box-shadow p-1">
              <div className="p-title">
                <h2>Posted Jobs</h2>
              </div>
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
            </div>
          </main>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default managejob;
