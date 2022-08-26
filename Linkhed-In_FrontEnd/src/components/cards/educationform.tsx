import axios from "axios";
import "../../styles/profileform.scss";
import { useAuth } from "../../utils/authContext";
import Cookies from "universal-cookie";
import { useModal } from "../../utils/modalContext";

const educationform = (props: any) => {
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
    console.log(data);
    axios
      .post("http://localhost:8080/addeducation", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        props.fetch_educations();
      });
  };
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
        <label>Start Year*</label>
        <div>
          <input type="number" className="input-text" id="startyear"></input>
        </div>
      </div>
      <div className="form-input">
        <label>End Year (or expected)*</label>
        <div>
          <input type="number" className="input-text" id="endyear"></input>
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
          onClick={() => {
            const school = (
              document.getElementById("school") as HTMLInputElement
            ).value;
            const degree = (
              document.getElementById("degree") as HTMLInputElement
            ).value;
            const fieldofstudy = (
              document.getElementById("fieldofstudy") as HTMLInputElement
            ).value;
            const startyear = (
              document.getElementById("startyear") as HTMLInputElement
            ).value;
            const endyear = (
              document.getElementById("endyear") as HTMLInputElement
            ).value;
            const activities = (
              document.getElementById("activities") as HTMLInputElement
            ).value;
            const description = (
              document.getElementById("description") as HTMLInputElement
            ).value;
            if (school && degree && fieldofstudy && startyear && endyear) {
              console.log("TEST");
              submit(
                school,
                degree,
                fieldofstudy,
                startyear,
                endyear,
                activities,
                description
              );
              modal.setIsOpen2(false);
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default educationform;
