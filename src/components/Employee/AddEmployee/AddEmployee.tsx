import { useDispatch, useSelector } from "../../../utils/hooks/hooks";
import Modal from "../../UI/Modal/Modal";
import classes from "./AddEmployee.module.scss";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import { staffActions } from "../../../store/slices/staff";

const AddEmployee = () => {
  const modalState = useSelector((state) => state.staff.modalState);
  const dispatch = useDispatch();

  const initValues = {
    name: "",
    surname: "",
    middleName: "",
    department: "",
    gender: "",
    pos: "",
    date: "",
  };

  const handleModalToggle = () => {
    dispatch(staffActions.toggleModal());
  };

  const handleSubmit = (data) => {
    dispatch(staffActions.addEmployee(data));
    handleModalToggle();
  };

  return (
    <>
      {modalState && (
        <Modal close={handleModalToggle}>
          <div className={classes.AddEmployee}>
            <EmployeeForm
              initValues={initValues}
              cancelButton={handleModalToggle}
              submitButton={handleSubmit}
              maxDate="2010-01-01"
              minDate="1900-01-01"
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddEmployee;
