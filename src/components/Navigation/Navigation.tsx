import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../utils/hooks/hooks";
import { showModal } from "../../store/slices/staff/staff";
import classes from "./Navigation.module.scss";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const addEmployeeHandler = (event) => {
    event.preventDefault();
    dispatch(showModal());
  };

  return (
    <header className={classes.Navigation}>
      <nav className={classes.Navigation__list}>
        <NavLink
          className={classes.Navigation__item}
          activeClassName={classes.active}
          to="/dashboard"
        >
          Dashboard
        </NavLink>
        <NavLink
          className={classes.Navigation__item}
          activeClassName={classes.active}
          to="/staff"
        >
          All employee
        </NavLink>
        <a
          href="/"
          className={classes.Navigation__item}
          onClick={addEmployeeHandler}
        >
          Add Employee
        </a>
      </nav>
    </header>
  );
};

export default memo(Navigation);
