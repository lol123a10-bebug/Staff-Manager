import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError, IStaff } from "../../utils/models/staff";

type InitState = {
  staff: IStaff[];
  error: IError;
  modalState: boolean;
};

const initialState: InitState = {
  staff: [],
  error: undefined,
  modalState: false,
};

const staff = createSlice({
  name: "staffSlice",
  initialState: initialState,
  reducers: {
    getStaff() {},

    setStaff(state, action) {
      console.log(action);

      state.staff = action.payload;
    },

    addEmployee(_, payload: PayloadAction<any>) {},

    editEmployee(_, payload: PayloadAction<any>) {
      console.log(payload);
    },

    removeEmployee(_, payload: PayloadAction<string>) {
      console.log(payload);
    },

    toggleModal(state) {
      state.modalState = !state.modalState;
    },
  },
});

export const { actions: staffActions, reducer: staffReducer } = staff;

export default staffReducer;
