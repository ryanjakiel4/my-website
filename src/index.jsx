import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import FiftyStates from "./games/FiftyStates.jsx";
import RollCall from "./games/RollCall.tsx";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App/>} />
      <Route exact path="/FiftyStates" element={<FiftyStates/>} />
      <Route exact path="/RollCall" element={<RollCall/>} />
    </Routes>
  </Router>
);
