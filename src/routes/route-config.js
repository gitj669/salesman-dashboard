import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from '../pages/dashboard';
import OneCustomerInvDetail from '../pages/oneCustomerInvDetail';
import SalesBreakdownDetail from '../pages/salesBreakdownDetail';
import S3SalesBreakdownDetail from '../pages/s3SalesBreakdownDetail';
import '../App.css';

export const BASE_PATH = '/lhome/apps';

export const Routes = [
  {
    component: Dashboard,
    path: `${BASE_PATH}/dashboard`,
    exact: true,
    title: 'Salesman Dashboard'
  },
  {
    component: Dashboard,
    path: `${BASE_PATH}/`,
    exact: true,
    title: 'Salesman Dashboard'
  },
  {
    component: OneCustomerInvDetail,
    path: `${BASE_PATH}/oneCustomerInvDetail`,
    exact: true,
    title: 'Salesman Dashboard'
  },
  {
    component: SalesBreakdownDetail,
    path: `${BASE_PATH}/salesBreakdownDetail`,
    exact: true,
    title: 'Salesman Dashboard'
  },
  {
    component: S3SalesBreakdownDetail,
    path: `${BASE_PATH}/s3SalesBreakdownDetail`,
    exact: true,
    title: 'Salesman Dashboard'
  }
];
