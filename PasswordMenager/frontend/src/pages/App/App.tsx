import { Provider } from "mobx-react";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import AppBar from "../../components/AppBar";
import { Loading } from "../../components/Loading";
import PopUpElement from "../../components/Popup";
import PrivateComponent from "../../components/PrivateRoute/index";
import UserRedirect from "../../components/UserRedirect";
import { DatabaseInit } from "../../local-database/init";
import { General, View } from "../../models/General";
import {
  ApplicationDatabase,
  ApplicationDatabaseType,
} from "../../models/applicationDatabase";
import LoginPage from "../../pages/Login";
import SignUp from "../../pages/SignUp/";
import { SessionStorage } from "../../utils/localstorage.utils";
import HomePage from "../Home";
import LocaSignUp from "../LocalSignUp";
import StorePage from "../Store/";
import "./App.css";
const notEmpty = (value: string | null | undefined): boolean => {
  return value !== null && value !== undefined && value !== "";
};
function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const store = General.create({
    useractive: notEmpty(SessionStorage.getInstance().getAccessToken()),
    popUpelement: {
      open: false,
      type: "error",
      message: "",
    },
    viewType: View.Table,
    isLocal:
      SessionStorage.getInstance().ApplicationDataType ===
      ApplicationDatabaseType.LOCAL,
    refetchAfterEntryCreate: false,
  });
  useEffect(() => {
    DatabaseInit()
      .then((_) => _)
      .then((_) => setIsLoading(false));
  }, []);

  ApplicationDatabase.getInstance().DataBaseType =
    SessionStorage.getInstance().ApplicationDataType;
  return (
    <Loading
      loading={isLoading}
      ComponentToLoad={
        <Provider store={store}>
          <Router>
            <div className="App">
              <AppBar />
              <PopUpElement></PopUpElement>
              <UserRedirect path="/" Component={HomePage} />
              {/* <Route exact path="/" component={HomePage} /> */}
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUp} />
              <Route path="/local-signup" component={LocaSignUp} />
              <PrivateComponent path="/store" Component={StorePage} />
            </div>
          </Router>
        </Provider>
      }
    ></Loading>
  );
}

export default App;
