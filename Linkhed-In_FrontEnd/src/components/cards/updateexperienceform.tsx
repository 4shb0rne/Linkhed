import axios from "axios";
import "../../styles/profileform.scss";
import { useAuth } from "../../utils/authContext";
import Cookies from "universal-cookie";
import { useModal } from "../../utils/modalContext";
import { useEffect, useState } from "react";

const updateexperienceform = (props: any) => {
  const auth = useAuth();
  const cookies = new Cookies();
  const modal = useModal();
  const token = cookies.get("token");
  const [monthError, setMonthError] = useState("");
  const Selected = () => {
    (document.getElementById("employment") as HTMLInputElement).value =
      experience.EmploymentType;
  };
  useEffect(() => {
    Selected();
  }, []);
  const submit = (
    title: string,
    employment: string,
    company: string,
    location: string,
    industry: string,
    startmonth: string,
    startyear: string,
    endmonth: string,
    endyear: string
  ) => {
    const data = {
      user_id: auth.user.id,
      title: title,
      employmenttype: employment,
      location: location,
      industry: industry,
      companyname: company,
      startmonth: parseInt(startmonth),
      startyear: parseInt(startyear),
      endmonth: parseInt(endmonth),
      endyear: parseInt(endyear),
    };
    axios
      .put(
        "http://localhost:8080/updateexperience/" + props.experience.ID,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        props.fetch_experiences();
      });
  };
  const experience = props.experience;
  return (
    <div>
      <div className="form-input">
        <label>Title*</label>
        <div>
          <input
            type="text"
            className="input-text"
            id="title"
            defaultValue={experience.Title}
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Employment Type*</label>
        <div>
          <select className="input-text" id="employment">
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Self-Employeed">Self-Employeed</option>
            <option value="Freelance">Freelance</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Apprenticeship">Apprenticeship</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>
      </div>
      <div className="form-input">
        <label>Company Name*</label>
        <div>
          <input
            type="text"
            className="input-text"
            id="companyname"
            defaultValue={experience.CompanyName}
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Location*</label>
        <div>
          <input
            type="text"
            className="input-text"
            id="location"
            defaultValue={experience.Location}
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Industry*</label>
        <div>
          <input
            type="text"
            className="input-text"
            id="industry"
            defaultValue={experience.Industry}
          ></input>
        </div>
      </div>
      <div className="form-input col-2">
        <div>
          <label>Start Month*</label>
          <div>
            <input
              type="number"
              className="input-text"
              id="startmonth"
              defaultValue={experience.StartMonth}
            ></input>
          </div>
        </div>
        <div>
          <label>Start Year*</label>
          <div>
            <input
              type="number"
              className="input-text"
              id="startyear"
              defaultValue={experience.StartYear}
            ></input>
          </div>
        </div>
      </div>
      <div className="form-input col-2">
        <div>
          <label>End Month(optional)</label>
          <div>
            <input
              type="number"
              className="input-text"
              id="endmonth"
              defaultValue={experience.EndMonth}
            ></input>
          </div>
        </div>
        <div>
          <label>End Year(optional)</label>
          <div>
            <input
              type="number"
              className="input-text"
              id="endyear"
              defaultValue={experience.EndYear}
            ></input>
          </div>
        </div>
      </div>
      {monthError && <div className="text-red">{monthError}</div>}
      <div className="form-input">
        <button
          className="submit-btn"
          onClick={() => {
            const title = (document.getElementById("title") as HTMLInputElement)
              .value;
            const employment = (
              document.getElementById("employment") as HTMLInputElement
            ).value;
            const company = (
              document.getElementById("companyname") as HTMLInputElement
            ).value;
            const location = (
              document.getElementById("location") as HTMLInputElement
            ).value;
            const industry = (
              document.getElementById("industry") as HTMLInputElement
            ).value;
            const startmonth = (
              document.getElementById("startmonth") as HTMLInputElement
            ).value;
            const startyear = (
              document.getElementById("startyear") as HTMLInputElement
            ).value;
            const endmonth = (
              document.getElementById("endmonth") as HTMLInputElement
            ).value;
            const endyear = (
              document.getElementById("endyear") as HTMLInputElement
            ).value;
            if (
              title &&
              employment &&
              company &&
              location &&
              industry &&
              startmonth &&
              startyear
            ) {
              if (
                parseInt(startmonth) < 1 ||
                parseInt(startmonth) > 12 ||
                parseInt(endmonth) < 1 ||
                parseInt(endmonth) > 12
              ) {
                setMonthError(
                  "Start month or End month must be between 1 - 12"
                );
              } else {
                submit(
                  title,
                  employment,
                  company,
                  location,
                  industry,
                  startmonth,
                  startyear,
                  endmonth,
                  endyear
                );
                modal.setIsOpen5(false);
              }
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default updateexperienceform;
