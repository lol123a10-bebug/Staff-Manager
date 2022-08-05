import * as RR from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";

export const useFilteredStaff = (data) => {
  const { staff, department, gender } = data;
  if (department && gender) {
    return staff.filter((el) => el.gender === gender).filter((el) => el.department === department);
  }

  if (!department && gender) {
    return staff.filter((el) => el.gender === gender);
  }

  if (department && !gender) {
    return staff.filter((el) => el.department === department);
  }

  return staff;
};

export const useDispatch = () => RR.useDispatch<AppDispatch>();
export const useSelector: RR.TypedUseSelectorHook<RootState> = RR.useSelector;
