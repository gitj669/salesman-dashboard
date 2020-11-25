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
import S3SalesBreakdownDetail from './pages/s3SalesBreakdownDetail';
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
        <Route path="/s3SalesBreakdownDetail">
          <S3SalesBreakdownDetail />
        </Route>
      </Switch>
    </Router>
  );
};