import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../Home/index";
import AppBar from "../../components/AppBar";
import LoginPage from "../../pages/Login";
import SignUp from "../../pages/SignUp/";
import StorePage from "../Store/";
import { Provider } from "mobx-react";
import { General } from "../../models/General";
import { getAccessToken } from "../../utils/localstorage.utils";
import PrivateComponent from "../../components/PrivateRoute/index";
import "./App.css";
import PopUpElement from "../../components/Popup";
function App() {
  const store = General.create({
    useractive: getAccessToken() !== "" ? true : false,
    popUpelement: {
      open: false,
      type: 'error',
      message: '',
    }
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
