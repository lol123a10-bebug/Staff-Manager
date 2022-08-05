import { call, put, takeEvery } from "redux-saga/effects";
import StaffApi from "../../utils/api/StaffApi";
import { staffActions } from "../slices/staff";

function* staffWatcher() {
  yield takeEvery(staffActions.addEmployee.type, addEmployee);
  yield takeEvery(staffActions.editEmployee.type, editEmployee);
  yield takeEvery(staffActions.removeEmployee.type, removeEmployee);

  yield takeEvery(
    [
      staffActions.getStaff.type,
      staffActions.addEmployee.type,
      staffActions.editEmployee.type,
      staffActions.removeEmployee.type,
    ],
    getStaff
  );
}

export default staffWatcher;

function* getStaff() {
  const staff = yield call(StaffApi.fetchStaff);

  yield put(staffActions.setStaff(staff));
}

function* addEmployee(action) {
  const { payload } = action;

  yield call(StaffApi.addEmployee, payload);
}

function* editEmployee(action) {
  console.log(action);
  yield call(StaffApi.editEmployee, action.payload);
}

function* removeEmployee(action) {
  yield call(StaffApi.removeEmployee, action.payload);
}
