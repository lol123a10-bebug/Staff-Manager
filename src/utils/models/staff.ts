export interface IStaff {
  id?: string;
  name: string;
  middleName: string;
  surname: string;
  department: string;
  pos: string;
  gender: string;
  date: string;
}

export type IStatus = "idle" | "success" | "failed" | "pending";

export type IError = null | string | undefined;

export interface IStaffState {
  staff: IStaff[];
  status: IStatus;
  error: IError;
  modalState: boolean;
}
