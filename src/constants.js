export const API_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT'
};

//const hostname = new URL(window.location).hostname;
//export const API_BASE_URL = `https://${hostname}/api/`;
export const API_BASE_URL = 'http://54.160.141.173:3010/api/'

export const API_URL = {
  SALES_CALL_BY_MONTH: `${API_BASE_URL}dashboard/salesCallByMonth/`,
  SALES_BY_MONTH: `${API_BASE_URL}dashboard/salesByMonth/`,
  ORDER_ENTRY: `${API_BASE_URL}dashboard/orderEntry/`,
  ANNUALIZED_SALES: `${API_BASE_URL}dashboard/annualizedSales/`,
  ONE_CUSTOMER_INV: `${API_BASE_URL}dashboard/oneCustomerInv/`,
  SALES_BREAKDOWN: `${API_BASE_URL}dashboard/salesBreakDown/`,
  S3_SALES_BREAKDOWN: `${API_BASE_URL}dashboard/s3SalesBreakdown/`,
  TOP_CONTACTS: `${API_BASE_URL}dashboard/topContacts/`,
  RECENT_ACTIVITY: `${API_BASE_URL}dashboard/recentActivity/`,
  CUSTOMER: `${API_BASE_URL}/customer/customer/`,
  ONE_CUSTOMER_INV_DETAIL: `${API_BASE_URL}dashboard/oneCustomerInvDetail/`,
  SALES_BREAKDOWN_DETAIL: `${API_BASE_URL}dashboard/salesBreakdownDetail/`
};

export const API_NAMES = {
  orderEntry: 'orderEntry',
  salesCallByMonth: 'salesCallByMonth',
  annualizedSales: 'annualizedSales',
  salesByMonth: 'salesByMonth',
  oneCustomerInv: 'oneCustomerInv',
  salesBreakDown: 'salesBreakDown',
  s3SalesBreakdown: 's3SalesBreakdown',
  topContacts: 'topContacts',
  recentActivity: 'recentActivity',
  customer: 'customer'
};

export const PAGE_STATUS = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  DEFAULT: 'DEFAULT'
}
