import { useMemo } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import EmployeeForm from "../../components/Employee/EmployeeForm/EmployeeForm";
import { useDispatch, useSelector } from "../../utils/hooks/hooks";

import classes from "./Employee.module.scss";
import { selectStaffById } from "../../utils/hooks/useStaffStatistic";
import { staffActions } from "../../store/slices/staff";

const Employee = () => {
  const { id } = useParams<{ id: string }>();
  const employee = useSelector((state) => selectStaffById(state, id));
  const dispatch = useDispatch();
  const history = useHistory();

  const [editMode, setEditMode] = useState(false);

  const handleToggle = () => {
    setEditMode((isEdit) => !isEdit);
  };

  const handleSubmit = (data) => {
    dispatch(staffActions.editEmployee({ id, ...data }));
    handleToggle();
  };

  const handleRemove = () => {
    dispatch(staffActions.removeEmployee(id));
    history.push("/staff");
  };

  return (
    <div className={classes.Employee}>
      {employee && (
        <EmployeeForm
          cancelButton={handleToggle}
          initValues={employee}
          disabled={!editMode}
          submitButton={handleSubmit}
          editButton={handleToggle}
          removeButton={handleRemove}
          Card
          maxDate="2010-01-01"
          minDate="1900-01-01"
        />
      )}
      {/* {error && <div className={classes.Employee__error}>{error}</div>} */}
    </div>
  );
};

export default Employee;
