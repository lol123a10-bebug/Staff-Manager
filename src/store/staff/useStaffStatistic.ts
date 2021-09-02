import {
  filterStaffByDepartment,
  filterStaffByGender,
  selectAllStaff,
} from "./staff";

import { names } from "../../interfaces/names";

import { useAppSelector } from "../hooks";

export const useStaffStatistic = () => {
  const staff = useAppSelector(selectAllStaff);

  const men = useAppSelector((state) =>
    filterStaffByGender(state, names.Мужчина)
  );

  const women = useAppSelector((state) =>
    filterStaffByGender(state, names.Женщина)
  );

  const Бухгалтерия = useAppSelector((state) =>
    filterStaffByDepartment(state, names.Бухгалтерия)
  );

  const Маркетинг = useAppSelector((state) =>
    filterStaffByDepartment(state, names.Маркетинг)
  );

  const IT = useAppSelector((state) =>
    filterStaffByDepartment(state, names.IT)
  );

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
