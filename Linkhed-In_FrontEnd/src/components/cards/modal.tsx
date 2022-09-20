import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import "../../styles/modal.scss";
const Modal = ({
  modal,
  setModal,
  children,
  ariaText,
}: {
  modal: any;
  setModal: any;
  children: any;
  ariaText: any;
}) => {
  return (
    <Dialog
      isOpen={modal}
      onDismiss={() => setModal(false)}
      aria-label={ariaText}
      className="modal modal-z fade-in"
    >
      <div className="flex justify-end">
        <div>
          <div className="mouse-pointer" onClick={() => setModal(false)}>
            X
          </div>
        </div>
      </div>
      {children}
    </Dialog>
  );
};

export default Modal;
