import { useStaffStatistic } from "../../utils/hooks/useStaffStatistic";
import classes from "./Staff.module.scss";
import { Button } from "../../components/UI/Button/Button";
import { useHistory, useRouteMatch } from "react-router-dom";
import { names } from "../../utils/models/names";
import { useEffect, useMemo, useState } from "react";
import { IStaff } from "../../utils/models/staff";
import { useFilteredStaff } from "../../utils/hooks/hooks";
import StaffTable from "../../components/Staff/StaffTable";

const Staff = () => {
  const { staff } = useStaffStatistic();
  const { path } = useRouteMatch();
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [block, setBlock] = useState(false);
  const history = useHistory();

  const [size] = useState(10);

  const [pageNumber, setPageNumber] = useState(0);

  const filteredStaff = useFilteredStaff({ staff, department, gender });

  const paginatedData = useMemo(() => {
    let start = pageNumber * size;
    const end = start + size;
    return filteredStaff.slice(start, end);
  }, [filteredStaff, pageNumber, size]);

  const [maxPageNumber, setMaxPageNumber] = useState(
    Math.ceil(filteredStaff.length / size - 1)
  );

  const goByIdHandler = (id) => {
    history.push(`${path}/${id}`);
  };

  useEffect(() => {
    setPageNumber(0);
    if (filteredStaff.length === 0) {
      setMaxPageNumber(0);
      return;
    }
    setMaxPageNumber(Math.ceil(filteredStaff.length / size - 1));
  }, [gender, department, size, filteredStaff]);

  const nextPage = () => setPageNumber((prevVal) => prevVal + 1);
  const prevPage = () => setPageNumber((prevVal) => prevVal - 1);

  return (
    <div className={classes.Staff}>
      <div className={classes.Staff__filter} style={{ height: "100%" }}>
        <div className={classes.Staff__filter_inner}>
          <label htmlFor="department">
            <strong>Отдел: </strong>
          </label>
          <select
            id="department"
            className={classes.Staff__select}
            value={department}
            onChange={(el) => setDepartment(el.target.value)}
            placeholder="Отдел"
          >
            <option value="">All</option>
            <option value={names.IT}>{names.IT}</option>
            <option value={names.Бухгалтерия}>{names.Бухгалтерия}</option>
            <option value={names.Маркетинг}>{names.Маркетинг}</option>
          </select>
        </div>
        <div className={classes.Staff__filter_inner}>
          <label htmlFor="gender">
            <strong>Пол: </strong>
          </label>
          <select
            id="gender"
            className={classes.Staff__select}
            value={gender}
            onChange={(el) => setGender(el.target.value)}
          >
            <option value="">All</option>
            <option value={names.Мужчина}>{names.Мужчина}</option>
            <option value={names.Женщина}>{names.Женщина}</option>
          </select>
        </div>
        <Button
          className={classes.Staff__toggler}
          onClick={() => setBlock((oldState) => !oldState)}
        >
          {block ? <span>Table</span> : <span>Block</span>}
        </Button>
      </div>
      {block ? (
        <ul className={classes.Staff__list}>
          {paginatedData.map((employee: IStaff) => (
            <li key={employee.id} className={`${classes.Staff__item} Card`}>
              <div>
                <strong>Имя: </strong>
                <span>{employee.name}</span>
                <strong>Фамилия: </strong>
                <span>{employee.surname}</span>
                <strong>Отчество: </strong>
                <span>{employee.middleName}</span>
                <strong>Отдел: </strong>
                <span>{employee.department}</span>
                <strong>Должность: </strong>
                <span>{employee.pos}</span>
                <strong>Пол: </strong>
                <span>{employee.gender}</span>
                <strong>Дата рождения: </strong>
                <span>{employee.date}</span>
              </div>
              <p>
                <Button link to={`${path}/${employee.id}`}>
                  More details...
                </Button>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <StaffTable employees={paginatedData} onPath={goByIdHandler} />
      )}

      <div className={classes.Staff__buttons}>
        <Button onClick={prevPage} disabled={pageNumber === 0}>
          Prev
        </Button>
        <p>
          {pageNumber + 1}/{maxPageNumber + 1}
        </p>
        <Button onClick={nextPage} disabled={maxPageNumber === pageNumber}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Staff;
