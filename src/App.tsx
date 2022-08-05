import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";
import Staff from "./views/Staff/Staff";
import Employee from "./views/Employee/Employee";
import Navigation from "./components/Navigation/Navigation";
import Spinner from "./components/UI/Spinner/Spinner";
import { Button } from "./components/UI/Button/Button";
import { ReactNode, useEffect } from "react";
import AddEmployee from "./components/Employee/AddEmployee/AddEmployee";
import { useDispatch, useSelector } from "./utils/hooks/hooks";
import { isError } from "./utils/hooks/useStaffStatistic";
import { staffActions } from "./store/slices/staff";

const App = () => {
  const error = useSelector(isError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(staffActions.getStaff());
  }, [dispatch]);

  let app: ReactNode;

  if (false) {
    app = (
      <div className="App__error">
        <div className="Card">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      </div>
    );
  }

  if (false) {
    app = <Spinner />;
  }

  if (true) {
    app = (
      <Switch>
        <Redirect from="/" to="/dashboard" exact />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/staff/:id" component={Employee} />
        <Route path="/staff" component={Staff} />
      </Switch>
    );
  }

  return (
    <>
      <Navigation />
      <AddEmployee />
      <main>{app}</main>
    </>
  );
};

export default App;
