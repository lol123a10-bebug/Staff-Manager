import { useAppDispatch, useAppSelector } from "../../utils/hooks/hooks";
import { addData, closeModal } from "../../store/staff/staff";
import Modal from "../UI/Modal/Modal";
import classes from "./AddEmployee.module.scss";
import EmployeeForm from "../EmployeeForm/EmployeeForm";

const AddEmployee = () => {
  const modalState = useAppSelector((state) => state.staff.modalState);
  const dispatch = useAppDispatch();

  const initValues = {
    name: "",
    surname: "",
    middleName: "",
    department: "",
    gender: "",
    pos: "",
    date: "",
  };

  const ModalCloseHandler = () => {
    dispatch(closeModal());
  };

  const submitHandler = (data) => {
    dispatch(addData(data));
    ModalCloseHandler();
  };

  return (
    <>
      {modalState && (
        <Modal close={ModalCloseHandler}>
          <div className={classes.AddEmployee}>
            <EmployeeForm
              initValues={initValues}
              cancelButton={ModalCloseHandler}
              submitButton={submitHandler}
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
