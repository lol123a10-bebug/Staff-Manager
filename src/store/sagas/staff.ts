import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import StaffApi from "../../utils/api/StaffApi";
import { IEmployee } from "../../utils/models/staff";
import { staffActions } from "../slices/staff";

function* staffWatcher() {
  yield takeLatest(staffActions.addEmployee.type, addEmployee);
  yield takeLatest(staffActions.editEmployee.type, editEmployee);
  yield takeLatest(staffActions.removeEmployee.type, removeEmployee);
  yield takeLatest(staffActions.getStaff, getStaff);
}

export default staffWatcher;

function* getStaff() {
  console.log("get staff", new Date().toISOString());
  const staff: IEmployee[] = yield call(StaffApi.fetchStaff);

  yield put(staffActions.setStaff(staff));
}

function* addEmployee(action) {
  const { payload } = action;

  yield call(StaffApi.addEmployee, payload);
  yield call(getStaff);
}

function* editEmployee(action) {
  yield call(StaffApi.editEmployee, action.payload);
  yield call(getStaff);
}

function* removeEmployee(action) {
  yield call(StaffApi.removeEmployee, action.payload);
  yield call(getStaff);
}
