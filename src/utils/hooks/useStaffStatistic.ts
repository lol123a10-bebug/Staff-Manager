import { getYear, subYears } from "date-fns";
import { useMemo } from "react";
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

  const avgYears = useMemo(() => {
    const birthYears = staff.map((employee) => {
      const birthday = new Date(employee.date);
      const age = subYears(new Date(), getYear(birthday));

      return getYear(age);
    });

    const ageSum = birthYears.reduce((prev, curr) => {
      return prev + curr;
    }, 0);

    return Math.floor(ageSum / staff.length);
  }, [staff]);

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

export const isError = (state: RootState) => state.staff.error;
