import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import verifyUser from "../../utils/verifyUser";

interface LocationState {
  state: {
    responsedata: any;
  };
}

const verificationcode = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation() as LocationState;
  const userId = location.state.responsedata.id;
  const verificationcode = location.state.responsedata.VerificationCode;
  return (
    <div className="container-forgot">
      <div className="text">
        <h1>Verification Code</h1>
      </div>
      <div className="your-input">
        <div className="input">
          <input
            type="text"
            name="verificationcode"
            id="verificationcode"
            required
          />
        </div>
      </div>
      {error && <div className="text-red">{error}</div>}
      <button
        className="login-btn"
        onClick={() => {
          const inputcode = (
            document.getElementById("verificationcode") as HTMLInputElement
          ).value;
          if (verificationcode == inputcode) {
            console.log("Verification True");
            verifyUser(userId);
            navigate("/login");
          } else {
            (
              document.getElementById("verificationcode") as HTMLInputElement
            ).value = "";
            setError("Wrong Verification Code");
          }
        }}
      >
        Verify Account
      </button>
    </div>
  );
};

export default verificationcode;
