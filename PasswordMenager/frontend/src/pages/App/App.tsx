import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../Home/index";
import AppBar from "../../components/AppBar";
import LoginPage from "../../pages/Login";
import SignUp from "../../pages/SignUp/";
import StorePage from "../Store/";
import "./App.css"
function App() {
  return (
    <Router>
      <div className="App">
        <AppBar />
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/store" component={StorePage} />
      </div>
    </Router>
  );
}

export default App;
