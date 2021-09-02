import classes from "./Modal.module.scss";
import Backdrop from "../Backdrop/Backdrop";

import ReactDOM from "react-dom";

interface IModal {
  children: React.ReactNode;
  close: () => any;
}

const Modal = (props: IModal) => {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <Backdrop clicked={props.close} />
          <div className={classes.Modal}>{props.children}</div>
        </>,
        document.body
      )}
    </>
  );
};

export default Modal;
