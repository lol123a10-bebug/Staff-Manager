import { IStaff } from "../../interfaces/staff";
import classes from "./StaffTable.module.scss";

interface Props {
  employees: IStaff[];
  onPath: (id: string) => void;
}

const StaffTable = (props: Props) => {
  return (
    <div className={classes.StaffTable__wrapper}>
      <table cellPadding="0" cellSpacing="0" className={classes.StaffTable}>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Отдел</th>
            <th>Должность</th>
            <th>Пол</th>
            <th>Дата рождения</th>
          </tr>
        </thead>
        <tbody>
          {props.employees.map((employee) => (
            <tr key={employee.id} onClick={() => props.onPath(employee.id!)}>
              <td>{employee.name}</td>
              <td>{employee.surname}</td>
              <td>{employee.middleName}</td>
              <td>{employee.department}</td>
              <td>{employee.pos}</td>
              <td>{employee.gender}</td>
              <td>{employee.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;
