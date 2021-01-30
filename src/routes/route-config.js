import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from '../pages/dashboard';
import OneCustomerInvDetail from '../pages/oneCustomerInvDetail';
import SalesBreakdownDetail from '../pages/salesBreakdownDetail';
import S3SalesBreakdownDetail from '../pages/s3SalesBreakdownDetail';
import SalesByMonthDetail from '../pages/salesByMonthDetail';
import '../App.css';

export const Routes = [
  {
    component: Dashboard,
    path: `/dashboard`,
    exact: true,
    title: 'Salesman Dashboard'
  },
  {
    component: Dashboard,
    path: `/`,
    exact: true,
    title: 'Salesman Dashboard'
  },
  {
    component: OneCustomerInvDetail,
    path: `/oneCustomerInvDetail`,
    exact: true,
    title: 'Salesman Dashboard'
  },
  {
    component: SalesBreakdownDetail,
    path: `/salesBreakdownDetail`,
    exact: true,
    title: 'Salesman Dashboard'
  },
  {
    component: S3SalesBreakdownDetail,
    path: `/s3SalesBreakdownDetail`,
    exact: true,
    title: 'Salesman Dashboard'
  },
  {
    component: SalesByMonthDetail,
    path: `/salesByMonthDetail`,
    exact: true,
    title: 'Salesman Dashboard'
  },
];
