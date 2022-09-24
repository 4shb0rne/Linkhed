import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useModal } from "../../../utils/modalContext";
const invitemodal = (props: any) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [open, setOpen] = useState(false);
  const modal = useModal();
  const inviteduser = props.invitedUser;
  const curruser = props.curruser;
  return (
    <div>
      <h3>You can customize this invitation</h3>
      <div>
        Linkhedin members are more likely to accept invitations that include a
        personal note.
      </div>
      <div className={`${open ? "" : "d-none"}`}>
        <textarea id="invitation-content"></textarea>
      </div>
      <div className="mt-2">
        <button
          className="yes-btn"
          onClick={() => {
            const content = (
              document.getElementById("invitation-content") as HTMLInputElement
            ).value;
            const data = {
              user_id: curruser.id,
              connection_id: inviteduser.id,
              content: content,
            };
            axios.post("http://localhost:8080/sendinvitation", data, {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            modal.setIsOpen(false);
          }}
        >
          Send Invitation
        </button>
      </div>
      <p
        onClick={() => {
          if (open == true) {
            setOpen(false);
          } else {
            setOpen(true);
          }
        }}
        className="text-blue cursor-pointer mt-2"
      >
        Add a note
      </p>
    </div>
  );
};

export default invitemodal;
