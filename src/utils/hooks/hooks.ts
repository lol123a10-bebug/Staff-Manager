import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";

export const useFilteredStaff = (data) => {
  const { staff, department, gender } = data;
  if (department && gender) {
    return staff
      .filter((el) => el.gender === gender)
      .filter((el) => el.department === department);
  }

  if (!department && gender) {
    return staff.filter((el) => el.gender === gender);
  }

  if (department && !gender) {
    return staff.filter((el) => el.department === department);
  }

  return staff;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
