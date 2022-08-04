import { all } from "redux-saga/effects";
import staffWatcher from "./staff";

const rootSaga = function* () {
  yield all([staffWatcher()]);
};

export default rootSaga;
