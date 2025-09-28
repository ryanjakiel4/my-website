import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import FiftyStates from "./games/FiftyStates.jsx";
import Yahtzee from "./games/Yahtzee.tsx";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App/>} />
      <Route exact path="/FiftyStates" element={<FiftyStates/>} />
      <Route exact path="/Yahtzee" element={<Yahtzee/>} />
    </Routes>
  </Router>
);
