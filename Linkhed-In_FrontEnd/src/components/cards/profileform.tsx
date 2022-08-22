import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../utils/auth";
import Cookies from "universal-cookie";
import { useModal } from "../../utils/modalContext";

const profileform = () => {
  const auth = useAuth();
  const modal = useModal();
  const [error, setError] = useState('');
  const cookies = new Cookies();
  const token = cookies.get("token");
  const submit = (firstname : any, lastname : any, headline : any, industry: any, country  : any, city: any)  =>{
    const data = {
      firstname: firstname,
      lastname: lastname,
      headline: headline,
      industry: industry,
      country: country,
      city: city
    }
    axios.put("http://localhost:8080/updateprofile/"+ auth.user.id, data, {
      headers: {
        Authorization: "Bearer " + token,
      }
    }
    ).then((response)=>{
      auth.login(response.data)
    })
  }
  return (
    <div>
      <div>{ error }</div>
      <div className="form-input">
        <label>First name*</label>
        <div>
          <input
            type="text"
            placeholder="First name"
            className="input-text"
            id="firstname"
            defaultValue={auth.user.firstname}
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Last name*</label>
        <div>
          <input
            type="text"
            placeholder="Last name"
            className="input-text"
            id="lastname"
            defaultValue={auth.user.lastname}
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Headline*</label>
        <div>
          <input
            type="text"
            placeholder="Headline"
            id="headline"
            className="input-text"
            defaultValue={auth.user.Headline}
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Industry*</label>
        <div>
          <input
            type="text"
            placeholder="Ex: Retail"
            id="industry"
            className="input-text"
            defaultValue={auth.user.Industry}
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>Country/Region*</label>
        <div>
          <input
            type="text"
            id="country"
            placeholder="Ex: United States"
            className="input-text"
            defaultValue={auth.user.Country}
          ></input>
        </div>
      </div>
      <div className="form-input">
        <label>City*</label>
        <div>
          <input type="text" className="input-text" id="city" defaultValue={auth.user.City}></input>
        </div>
      </div>
      <div className="form-input">
        <button className="submit-btn" onClick={()=>{
          const firstname = (document.getElementById('firstname') as HTMLInputElement).value;
          const lastname = (document.getElementById('lastname') as HTMLInputElement).value;
          const headline = (document.getElementById('headline')  as HTMLInputElement).value;
          const industry = (document.getElementById('industry') as HTMLInputElement).value;
          const country = (document.getElementById('country') as HTMLInputElement).value;
          const city = (document.getElementById('city') as HTMLInputElement).value;

          if(firstname && lastname && headline && industry && country && city){
            submit(firstname, lastname, headline, industry, country, city)
            modal.setIsOpen(false)
          } else{
            setError('All Field must be filled')
          }
        }}>Submit</button>
      </div>
    </div>
  );
};

export default profileform;
