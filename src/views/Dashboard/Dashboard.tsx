import classes from "./Dashboard.module.scss";
import StaffInfo from "../../components/Dashboard/StaffInfo";
import { useStaffStatistic } from "../../utils/hooks/useStaffStatistic";

const Dashboard = () => {
  const { staff, men, women, IT, Бухгалтерия, Маркетинг, avgYears } = useStaffStatistic();

  return (
    <div className={classes.Dashboard}>
      <StaffInfo
        overall={staff.length}
        men={men.length}
        women={women.length}
        IT={IT.length}
        Бухгалтерия={Бухгалтерия.length}
        Маркетинг={Маркетинг.length}
        average={avgYears}
      ></StaffInfo>
    </div>
  );
};

export default Dashboard;
