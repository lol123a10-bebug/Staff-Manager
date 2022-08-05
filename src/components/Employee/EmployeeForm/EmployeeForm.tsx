import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { names } from "../../../utils/models/names";
import { Button } from "../../UI/Button/Button";
import { handleChange, capitalizeText } from "../../../utils/helpers";

import classes from "./EmployeeForm.module.scss";
import { IEmployee } from "../../../utils/models/staff";

interface IForm {
  initValues: IEmployee;
  Card?: boolean;
  disabled?: boolean;
  maxDate: string;
  minDate: string;
  cancelButton: () => void;
  submitButton: (obj: IEmployee) => void;
  editButton?: () => void;
  removeButton?: () => void;
  className?: string;
}

const EmployeeForm = (props: IForm) => {
  const {
    initValues,
    Card,
    disabled,
    maxDate,
    minDate,
    cancelButton,
    submitButton,
    editButton,
    removeButton,
    className,
  } = props;

  const [employee, setEmployee] = useState(initValues);

  const resetEmployee = () => {
    setEmployee(initValues);
  };

  const handleCancel = () => {
    cancelButton();
    resetEmployee();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitButton(employee);
    resetEmployee();
  };

  const editButtonHandler = () => {
    if (editButton) editButton();
  };

  const removeButtonHandler = () => {
    if (removeButton) {
      removeButton();
    }
  };

  const handleChange = (field: keyof IEmployee) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEmployee((employee) => ({ ...employee, [field]: e.target.value }));
  };

  useEffect(() => {
    setEmployee(initValues);
  }, [initValues]);

  return (
    <form className={`${classes.EmployeeForm} ${disabled && "view"} ${className}`} onSubmit={handleSubmit}>
      <div className={`${classes.EmployeeForm__controls} ${Card && "Card"}`}>
        <label>
          <strong>Имя:</strong>
        </label>
        <input
          required
          disabled={disabled}
          onChange={handleChange("name")}
          value={employee.name}
          type="text"
          maxLength={12}
          minLength={2}
        ></input>
        <label>
          <strong>Фамилия:</strong>
        </label>
        <input
          required
          disabled={disabled}
          onChange={handleChange("surname")}
          value={employee.surname}
          type="text"
          minLength={2}
          maxLength={12}
        ></input>
        <label>
          <strong>Отчество:</strong>
        </label>
        <input
          required
          disabled={disabled}
          onChange={handleChange("middleName")}
          value={employee.middleName}
          type="text"
          minLength={2}
          maxLength={12}
        ></input>
        <label>
          <strong>Отдел:</strong>
        </label>
        <select disabled={disabled} required onChange={handleChange("department")} value={employee.department}>
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
              disabled={disabled}
              id={names.Мужчина}
              checked={employee.gender === names.Мужчина}
              name="gender"
              type="radio"
              value={names.Мужчина}
              onChange={handleChange("gender")}
            />
            <label htmlFor={names.Мужчина}>{names.Мужчина}</label>
          </span>
          <span>
            <input
              required
              disabled={disabled}
              id={names.Женщина}
              name="gender"
              type="radio"
              value={names.Женщина}
              onChange={handleChange("gender")}
              checked={employee.gender === names.Женщина}
            />
            <label htmlFor={names.Женщина}>{names.Женщина}</label>
          </span>
        </div>
        <label>
          <strong>Должность:</strong>
        </label>
        <input
          required
          disabled={disabled}
          onChange={handleChange("pos")}
          value={employee.pos}
          type="text"
          minLength={2}
          maxLength={12}
        ></input>
        <label>
          <strong>Birthday:</strong>
        </label>
        <input
          required
          disabled={disabled}
          onChange={handleChange("date")}
          value={employee.date}
          type="date"
          max={maxDate}
          min={minDate}
        ></input>
      </div>
      {disabled ? (
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
          <Button onClick={handleCancel} type="button">
            Cancel
          </Button>
          <Button type="submit">Accept</Button>
        </div>
      )}
    </form>
  );
};

export default EmployeeForm;
