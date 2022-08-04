import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IStaff, IStaffState } from "../../utils/models/staff";
import { RootState } from "../store";

export const fetchData = createAsyncThunk("staff/fetchData", async () => {
  const response = await axios.get("/staff.json");
  return response.data;
});

export const fetchDataById = createAsyncThunk("staff/fetchDataById", async ({ id }: { id: string }) => {
  const response = await axios.get(`/staff/${id}.json`);
  return response.data;
});

export const addData = createAsyncThunk("staff/addData", async (data: any) => {
  const response = await axios.post("/staff.json", data);
  return response.data;
});

export const updateData = createAsyncThunk("staff/updateData", async (data: any) => {
  const { id, ...others } = data;
  const response = await axios.patch(`/staff/${id}.json`, others);
  return response.data;
});

export const removeData = createAsyncThunk("staff/removeData", async (id: string) => {
  const response = await axios.delete(`/staff/${id}.json`);
  return response.data;
});

const initialState = {
  staff: [],
  status: "idle",
  error: null,
  modalState: false,
} as IStaffState;

const staff = createSlice({
  name: "staff",
  initialState,
  reducers: {
    showModal: (state) => {
      state.modalState = true;
    },
    closeModal: (state) => {
      state.modalState = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      const array: IStaff[] = [];
      for (const item in payload) {
        const obj = { ...payload[item], id: item };
        array.push(obj);
      }
      state.status = "success";
      state.staff = array;
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });

    builder.addCase(fetchDataById.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(fetchDataById.fulfilled, (state, action) => {
      // console.log(action);
    });

    builder.addCase(addData.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(addData.fulfilled, (state) => {
      state.status = "idle";
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });

    builder.addCase(updateData.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(updateData.fulfilled, (state) => {
      state.status = "idle";
    });

    builder.addCase(updateData.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });

    builder.addCase(removeData.fulfilled, (state) => {
      state.status = "idle";
    });
  },
});

export const { actions: staffActions, reducer: staffReducer } = staff;

export default staffReducer;

export const { closeModal, showModal } = staff.actions;

export const selectAllStaff = (state: RootState) => state.staff.staff;

export const selectStaffById = (state: RootState, id: string) => state.staff.staff.find((emp) => emp.id === id);

export const filterStaffByGender = (state: RootState, gender: string) =>
  state.staff.staff.filter((emp) => emp.gender === gender);

export const filterStaffByDepartment = (state: RootState, department: string) =>
  state.staff.staff.filter((emp) => emp.department === department);

export const statusState = (state: RootState) => state.staff.status;

export const isError = (state: RootState) => state.staff.error;
