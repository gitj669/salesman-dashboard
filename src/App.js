import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";
import { Routes, Router } from './routes';

export default function App() {
  return (
    <Router routes={Routes} defaultRoute={Routes[0].path} />
  );
};