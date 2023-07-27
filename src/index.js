import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import FiftyStates from "./games/FiftyStates";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App/>} />
      <Route exact path="/FiftyStates" element={<FiftyStates/>} />
    </Routes>
  </Router>,
  rootElement
);
