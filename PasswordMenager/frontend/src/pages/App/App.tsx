import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../Home/index";
import AppBar from "../../components/AppBar";
import LoginPage from "../../pages/Login";
import SignUp from "../../pages/SignUp/";
import StorePage from "../Store/";
import { Provider } from "mobx-react";
import { General } from "../../models/General";
import { SessionStorage } from "../../utils/localstorage.utils";
import PrivateComponent from "../../components/PrivateRoute/index";
import "./App.css";
import PopUpElement from "../../components/Popup";
const notEmpty = (value: string | null | undefined): boolean => {
  return value !== null && value !== undefined && value !== "";
};
function App() {
  const store = General.create({
    useractive: notEmpty(SessionStorage.getInstance().getAccessToken()),
    popUpelement: {
      open: false,
      type: "error",
      message: "",
    },
  });
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppBar />
          <PopUpElement></PopUpElement>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUp} />
          <PrivateComponent path="/store" Component={StorePage} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
