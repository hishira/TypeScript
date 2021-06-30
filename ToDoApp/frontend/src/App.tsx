import React from "react";
import MainPage from "./pages/Main.page/index";
import { Route, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route path="/" exact component={MainPage} />
    </Router>
  );
}

export default App;
