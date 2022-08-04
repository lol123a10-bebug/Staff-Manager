import { useMemo } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import { IStaff } from "../../utils/models/staff";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/hooks";
import {
  removeData,
  selectStaffById,
  updateData,
} from "../../store/staff/staff";
import classes from "./Employee.module.scss";

const Employee = () => {
  const { id } = useParams<{ id: string }>();
  const employee = useAppSelector((state) =>
    selectStaffById(state, id)
  ) as IStaff;
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [editMode, setEditMode] = useState(false);

  const initValues = useMemo(() => {
    return {
      name: employee.name,
      surname: employee.surname,
      middleName: employee.middleName,
      department: employee.department,
      gender: employee.gender,
      pos: employee.pos,
      date: employee.date,
    };
  }, [employee]);

  const cancelButtonHandler = () => {
    setEditMode(false);
  };

  const submitButtonHandler = async (data) => {
    await dispatch(updateData({ id, ...data }));
  };

  const editButtonHandler = () => {
    setEditMode(true);
  };

  const removeButtonHandler = async () => {
    await dispatch(removeData(id));
    history.push("/staff");
  };

  return (
    <div className={classes.Employee}>
      <EmployeeForm
        cancelButton={cancelButtonHandler}
        initValues={initValues}
        disabled={!editMode}
        submitButton={submitButtonHandler}
        editButton={editButtonHandler}
        removeButton={removeButtonHandler}
        Card
        maxDate="2010-01-01"
        minDate="1900-01-01"
      />
      {/* {error && <div className={classes.Employee__error}>{error}</div>} */}
    </div>
  );
};

export default Employee;
