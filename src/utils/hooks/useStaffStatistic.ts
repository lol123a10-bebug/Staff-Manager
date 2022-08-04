import { RootState } from "../../store/store";
import { names } from "../models/names";

import { useAppSelector } from "./hooks";

export const useStaffStatistic = () => {
  const staff = useAppSelector((state) => state.staff.staff);

  const men = useAppSelector((state) => filterStaffByGender(state, names.Мужчина));

  const women = useAppSelector((state) => filterStaffByGender(state, names.Женщина));

  const Бухгалтерия = useAppSelector((state) => filterStaffByDepartment(state, names.Бухгалтерия));

  const Маркетинг = useAppSelector((state) => filterStaffByDepartment(state, names.Маркетинг));

  const IT = useAppSelector((state) => filterStaffByDepartment(state, names.IT));

  const avgYears = (() => {
    const array: number[] = [];
    for (const employee of staff) {
      const birthday = new Date(employee.date);
      const diff = Date.now() - birthday.getTime();
      const age_diff = new Date(diff);
      const year = age_diff.getUTCFullYear();
      const age = Math.abs(year - 1970);
      array.push(age);
    }

    const age = array.reduce((prevVal, curVal) => {
      return prevVal + curVal;
    }, 0);

    return Math.floor(age / staff.length);
  })();

  return {
    staff,
    men,
    women,
    Бухгалтерия,
    Маркетинг,
    IT,
    avgYears,
  };
};

export const selectAllStaff = (state: RootState) => state.staff.staff;

export const selectStaffById = (state: RootState, id: string) => state.staff.staff.find((emp) => emp.id === id);

export const filterStaffByGender = (state: RootState, gender: string) =>
  state.staff.staff.filter((emp) => emp.gender === gender);

export const filterStaffByDepartment = (state: RootState, department: string) =>
  state.staff.staff.filter((emp) => emp.department === department);

export const statusState = (state: RootState) => state.staff.status;

export const isError = (state: RootState) => state.staff.error;
