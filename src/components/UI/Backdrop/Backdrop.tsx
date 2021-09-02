import classes from "./Backdrop.module.scss";

const Backdrop = (props) => (
  <div onClick={props.clicked} className={classes.Backdrop}></div>
);

export default Backdrop;
