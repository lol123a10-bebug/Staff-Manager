import classes from "./staffInfo.module.scss";

interface staffProps {
  overall: number;
  men: number;
  women: number;
  Бухгалтерия: number;
  IT: number;
  Маркетинг: number;
  average: number;
  className?: string;
}

export const StaffInfo = (props: staffProps) => {
  const { overall, men, women, Бухгалтерия, IT, Маркетинг, average } = props;
  return (
    <div className={`${classes.StaffInfo} Card ${props.className}`}>
      <p>
        <strong>Количество сотрудников: </strong>
        <span>{overall}</span>
        <span> человек</span>
      </p>
      <p className={classes.StaffInfo__gender}>
        <strong>Сотрудники: </strong>
        <br />
        <span>Мужчин: {men} человек</span>
        <span>Женщин: {women} человек</span>
      </p>
      <p>
        <strong>Отделы:</strong>
      </p>
      <p>
        Бухгалтерия: <span>{Бухгалтерия} человек</span>
      </p>
      <p>
        IT: <span>{IT} человек</span>
      </p>
      <p>
        Маркетинг: <span>{Маркетинг} человек</span>
      </p>
      <p>
        <strong>Средний возраст: </strong>
        <span>{average} лет</span>
      </p>
    </div>
  );
};
