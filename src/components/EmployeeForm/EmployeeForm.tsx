import { useState } from "react";
import { names } from "../../utils/models/names";
import { Button } from "../UI/Button/Button";
import { handleChange, capitalizeText } from "../../utils/helpers";

import classes from "./EmployeeForm.module.scss";
import { IStaff } from "../../utils/models/staff";

interface IForm {
  initValues: IStaff;
  Card?: boolean;
  disabled?: boolean;
  maxDate: string;
  minDate: string;
  cancelButton: () => void;
  submitButton: (obj: IStaff) => void;
  editButton?: () => void;
  removeButton?: () => void;
  className?: string;
}

const EmployeeForm = (props: IForm) => {
  const [name, setName] = useState(props.initValues.name);
  const [surname, setSurname] = useState(props.initValues.surname);
  const [middleName, setMiddleName] = useState(props.initValues.middleName);
  const [department, setDepartment] = useState(props.initValues.department);
  const [gender, setGender] = useState(props.initValues.gender);
  const [pos, setPos] = useState(props.initValues.pos);
  const [date, setDate] = useState(props.initValues.date);

  const initValue = () => {
    setName(props.initValues.name);
    setSurname(props.initValues.surname);
    setMiddleName(props.initValues.middleName);
    setDepartment(props.initValues.department);
    setGender(props.initValues.gender);
    setPos(props.initValues.pos);
    setDate(props.initValues.date);
  };

  const cancelButtonHandler = () => {
    props.cancelButton();
    initValue();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.submitButton({
      name,
      surname,
      middleName,
      department,
      gender,
      pos,
      date,
    });
    initValue();
  };

  const editButtonHandler = () => {
    if (props.editButton) {
      props.editButton();
    }
  };

  const removeButtonHandler = () => {
    if (props.removeButton) {
      props.removeButton();
    }
  };

  const changeNameHandler = (e) => setName(capitalizeText(e.target.value));
  const changeSurnameHandler = (e) =>
    setSurname(capitalizeText(e.target.value));
  const changeMiddlenameHandler = (e) =>
    setMiddleName(capitalizeText(e.target.value));
  const changeDepartmentHandler = (e) =>
    setDepartment(capitalizeText(e.target.value));
  const changeGenderHandler = (e) => setGender(capitalizeText(e.target.value));
  const changePosHandler = (e) => setPos(capitalizeText(e.target.value));
  const changeDateHandler = (e) => setDate(capitalizeText(e.target.value));

  return (
    <form
      className={`${classes.EmployeeForm} ${props.disabled && "view"} ${
        props.className
      }`}
      onSubmit={submitHandler}
    >
      <div
        className={`${classes.EmployeeForm__controls} ${props.Card && "Card"}`}
      >
        <label>
          <strong>Имя:</strong>
        </label>
        <input
          required
          disabled={props.disabled}
          onChange={(e) => handleChange(e, changeNameHandler)}
          value={name}
          type="text"
          maxLength={12}
          minLength={2}
        ></input>
        <label>
          <strong>Фамилия:</strong>
        </label>
        <input
          required
          disabled={props.disabled}
          onChange={(e) => handleChange(e, changeSurnameHandler)}
          value={surname}
          type="text"
          minLength={2}
          maxLength={12}
        ></input>
        <label>
          <strong>Отчество:</strong>
        </label>
        <input
          required
          disabled={props.disabled}
          onChange={(e) => handleChange(e, changeMiddlenameHandler)}
          value={middleName}
          type="text"
          minLength={2}
          maxLength={12}
        ></input>
        <label>
          <strong>Отдел:</strong>
        </label>
        <select
          disabled={props.disabled}
          required
          onChange={changeDepartmentHandler}
          value={department}
        >
          <option value="" disabled hidden>
            Please Choose...
          </option>
          <option>{names.IT}</option>
          <option>{names.Бухгалтерия}</option>
          <option>{names.Маркетинг}</option>
        </select>
        <label>
          <strong>Пол:</strong>
        </label>
        <div className={classes.EmployeeForm__radios}>
          <span>
            <input
              required
              disabled={props.disabled}
              id={names.Мужчина}
              checked={gender === names.Мужчина}
              name="gender"
              type="radio"
              value={names.Мужчина}
              onChange={changeGenderHandler}
            />
            <label htmlFor={names.Мужчина}>{names.Мужчина}</label>
          </span>
          <span>
            <input
              required
              disabled={props.disabled}
              id={names.Женщина}
              name="gender"
              type="radio"
              value={names.Женщина}
              onChange={changeGenderHandler}
              checked={gender === names.Женщина}
            />
            <label htmlFor={names.Женщина}>{names.Женщина}</label>
          </span>
        </div>
        <label>
          <strong>Должность:</strong>
        </label>
        <input
          required
          disabled={props.disabled}
          onChange={(e) => handleChange(e, changePosHandler)}
          value={pos}
          type="text"
          minLength={2}
          maxLength={12}
        ></input>
        <label>
          <strong>Birthday:</strong>
        </label>
        <input
          required
          disabled={props.disabled}
          onChange={changeDateHandler}
          value={date}
          type="date"
          max={props.maxDate}
          min={props.minDate}
        ></input>
      </div>
      {props.disabled ? (
        <div className={classes.EmployeeForm__buttons}>
          <Button onClick={editButtonHandler} type="button">
            Edit
          </Button>
          <Button onClick={removeButtonHandler} type="button">
            Remove
          </Button>
        </div>
      ) : (
        <div className={classes.EmployeeForm__buttons}>
          <Button onClick={cancelButtonHandler} type="button">
            Cancel
          </Button>
          <Button type="submit">Accept</Button>
        </div>
      )}
    </form>
  );
};

export default EmployeeForm;
