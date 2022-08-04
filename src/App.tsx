import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";
import Staff from "./views/Staff/Staff";
import Employee from "./views/Employee/Employee";
import Navigation from "./components/Navigation/Navigation";
import { fetchData, isError, statusState } from "./store/slices/staff";
import Spinner from "./components/UI/Spinner/Spinner";
import { Button } from "./components/UI/Button/Button";
import { ReactNode, useEffect } from "react";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import { useAppDispatch, useAppSelector } from "./utils/hooks/hooks";

const App = () => {
  const status = useAppSelector(statusState);
  const error = useAppSelector(isError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  let app: ReactNode;

  if (status === "failed") {
    app = (
      <div className="App__error">
        <div className="Card">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      </div>
    );
  }

  if (status === "pending" || status === "idle") {
    app = <Spinner />;
  }

  if (status === "success") {
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
