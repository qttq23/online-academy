import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Homepage from "./Homepage/Homepage";
import CourseDetail from "./CourseDetail/CourseDetail"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
      <Route exact path="/home" component={Homepage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/courses/:id" component={CourseDetail} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
