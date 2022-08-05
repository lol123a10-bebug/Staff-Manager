import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError, IEmployee } from "../../utils/models/staff";

type InitState = {
  staff: IEmployee[];
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
      state.staff = action.payload;
    },

    addEmployee(_, payload: PayloadAction<any>) {},

    editEmployee(state, action: PayloadAction<IEmployee>) {
      // const employeeIndex = state.staff.findIndex((employee) => employee.id === action.payload.id);
      // if (employeeIndex !== -1) {
      //   state.staff[employeeIndex] = action.payload;
      // }
    },

    removeEmployee(_, payload: PayloadAction<string>) {},

    toggleModal(state) {
      state.modalState = !state.modalState;
    },
  },
});

export const { actions: staffActions, reducer: staffReducer } = staff;

export default staffReducer;
