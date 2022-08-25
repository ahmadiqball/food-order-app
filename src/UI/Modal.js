import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Fragment>
          <div className={classes.backdrop} />
          <div className={classes.modal}>{props.children}</div>
        </Fragment>,
        document.getElementById("modal-root")
      )}
    </Fragment>
  );
};

export default Modal;
