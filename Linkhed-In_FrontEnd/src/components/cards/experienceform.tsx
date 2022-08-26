import axios from "axios";
import "../../styles/profileform.scss";
import { useAuth } from "../../utils/authContext";
import Cookies from "universal-cookie";
import { useModal } from "../../utils/modalContext";

const experienceform = () => {
  const auth = useAuth();
  const cookies = new Cookies();
  const modal = useModal();
  const token = cookies.get("token");
  const submit = (
    school: string,
    degree: string,
    fieldofstudy: string,
    startyear: string,
    endyear: string,
    activities: string,
    description: string
  ) => {
    const data = {
      user_id: auth.user.id,
      school: school,
      degree: degree,
      fieldofstudy: fieldofstudy,
      startyear: parseInt(startyear),
      endyear: parseInt(endyear),
      activities: activities,
      description: description,
    };
    axios
      .post("http://localhost:8080/addeducation", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {});
  };
  return (
    <div>
      <div className="form-input">
        <label>Title*</label>
        <div>
          <input type="text" className="input-text" id="title"></input>
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
          <input type="text" className="input-text" id="companyname"></input>
        </div>
      </div>
      <div className="form-input">
        <label>Location*</label>
        <div>
          <input type="text" className="input-text" id="location"></input>
        </div>
      </div>
      <div className="form-input">
        <label>Industry*</label>
        <div>
          <input type="text" className="input-text" id="industry"></input>
        </div>
      </div>
      <div className="form-input col-2">
        <div>
          <label>Start Month*</label>
          <div>
            <input type="number" className="input-text" id="startmonth"></input>
          </div>
        </div>
        <div>
          <label>Start Year*</label>
          <div>
            <input type="number" className="input-text" id="startyear"></input>
          </div>
        </div>
      </div>
      <div className="form-input col-2">
        <div>
          <label>End Month*</label>
          <div>
            <input type="number" className="input-text" id="endmonth"></input>
          </div>
        </div>
        <div>
          <label>End Year*</label>
          <div>
            <input type="number" className="input-text" id="endyear"></input>
          </div>
        </div>
      </div>
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
            // if (school && degree && fieldofstudy && startyear && endyear) {
            //   submit(
            //     school,
            //     degree,
            //     fieldofstudy,
            //     startyear,
            //     endyear,
            //     activities,
            //     description
            //   );
            //   modal.setIsOpen2(false);
            // }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default experienceform;
