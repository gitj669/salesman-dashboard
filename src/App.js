import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/dashboard';
import OneCustomerInvDetail from './pages/oneCustomerInvDetail';
import SalesBreakdownDetail from './pages/salesBreakdownDetail';
import './App.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" initial>
          <Dashboard />
        </Route>
        <Route path="/oneCustomerInvDetail">
          <OneCustomerInvDetail />
        </Route>
        <Route path="/salesBreakdownDetail">
          <SalesBreakdownDetail />
        </Route>
      </Switch>
    </Router>
  );
};