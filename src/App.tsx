import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DynamicFormulaCalculator from "./DynamicFormulaCalculator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DynamicFormulaCalculator />} />
    </Routes>
  );
}

export default App;
