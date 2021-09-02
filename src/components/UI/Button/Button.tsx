import { Link } from "react-router-dom";
import classes from "./Button.module.scss";

export const Button = (props) => {
  const { children, className, to, link, ...others } = props;
  if (link) {
    return (
      <Link {...others} className={`${classes.Button} ${className}`} to={to}>
        {children}
      </Link>
    );
  } else {
    return (
      <button {...others} className={`${classes.Button} ${className}`}>
        {children}
      </button>
    );
  }
};
