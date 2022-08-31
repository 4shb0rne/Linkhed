import { useAuth } from "../utils/authContext";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { useEffect, useState } from "react";
import getEducation from "../utils/getEducation";
import getExperience from "../utils/getExperience";
import { useParams } from "react-router-dom";
import axios from "axios";

const userprofile = () => {
  const params = useParams();
  const auth = useAuth();
  const id = parseInt(params.id!);
  const [user, setUser]: any = useState(null);
  const fetch_user = async () => {
    axios.get("http://localhost:8080/users/" + params.id).then((response) => {
      setUser(response.data);
    });
  };

  const [educations, setEducations] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const fetch_educations = async () => {
    const educations = await getEducation(id);
    setEducations(educations);
  };
  const fetch_experiences = async () => {
    const experience = await getExperience(id);
    setExperiences(experience);
  };
  useEffect(() => {
    fetch_user();
    fetch_educations();
    fetch_experiences();
  }, []);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "ashbornee",
    },
  });
  if (user && auth.user) {
    const myImage = cld.image(user["profile_picture"]);
    const myBackgroundImage = cld.image(user["background_picture"]);
    myImage.resize(fill().width(250).height(250));
    return (
      <div>
        <div className="box-shadow m-10">
          <div id="profile-upper">
            <div id="profile-banner-image">
              <label htmlFor="backgroundupload">
                <AdvancedImage cldImg={myBackgroundImage} />
              </label>
            </div>
            <div id="profile-d">
              <div id="profile-pic">
                <label htmlFor="imgupload">
                  <AdvancedImage cldImg={myImage} />
                </label>
              </div>
              <div className="tb" id="m-btns">
                <div className="td"></div>
                <div className="td"></div>
              </div>
              <div id="edit-profile"></div>
            </div>
            <div id="black-grd"></div>
          </div>
          <div className="ml-5">
            <div className="flex flex-space-between mt-5">
              <h1>
                {user["firstname"]} {user["lastname"]}
              </h1>
              {auth.user.id != id && <button>Connect</button>}
            </div>
          </div>
          <div className="flex ml-5">{user["Headline"]}</div>
          <div className="flex ml-5">
            {user["City"]}, {user["Country"]}
          </div>
        </div>
        <div className="box-shadow m-10 mt-1">
          <div className="flex flex-space-between">
            <h1 className="p-3">Education</h1>
          </div>
          {educations &&
            educations.map((e) => {
              return (
                <div className="m-3 mt-1">
                  <h2>{e.School}</h2>
                  <p>
                    {e.Degree}, {e.FieldOfStudy}
                  </p>
                  <p className="text-gray">
                    {e.StartYear} - {e.EndYear}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="box-shadow m-10 mt-1">
          <div className="flex flex-space-between">
            <h1 className="p-3">Experience</h1>
          </div>
          {experiences &&
            experiences.map((e) => {
              return (
                <div className="m-3 mt-1">
                  <h1>{e.CompanyName}</h1>
                  <h2>{e.Title}</h2>
                  <p>{e.EmploymentType}</p>
                  <p className="text-gray">
                    {e.StartMonth}-{e.StartYear} -{" "}
                    {e.EndYear == 0 ? "Present" : e.EndMonth + "-" + e.EndYear}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default userprofile;
