import {API_METHOD, API_URL} from '../constants';
import FetchApiResponse from './apiUtils';

export const getSalesCallByMonthData = async(id) => {
  let data;
  if (typeof(id) === 'number' && id >= 0) {
    const reqDetails = {
      method: API_METHOD.GET,
      apiUrl: `${API_URL.SALES_CALL_BY_MONTH}${id}`
    };
    data = await FetchApiResponse(reqDetails);
  }
  return data;
}

export const getOrderEntryData = async(id) => {
  let data;
  if (typeof(id) === 'number') {
    const reqDetails = {
      method: API_METHOD.GET,
      apiUrl: `${API_URL.ORDER_ENTRY}${id}`
    };
    data = await FetchApiResponse(reqDetails);
  }
  return data;
}

export const getAnnualizedSalesData = async(id) => {
  let data;
  if (typeof(id) === 'number') {
    const reqDetails = {
      method: API_METHOD.GET,
      apiUrl: `${API_URL.ANNUALIZED_SALES}${id}`
    };
    data = await FetchApiResponse(reqDetails);
  }
  return data;
}

export const getSalesByMonthData = async(id) => {
  let data;
  if (typeof(id) === 'number') {
    const reqDetails = {
      method: API_METHOD.GET,
      apiUrl: `${API_URL.SALES_BY_MONTH}${id}`
    };
    data = await FetchApiResponse(reqDetails);
  }
  return data;
}

export const getOneCustomerInvData = async(id) => {
  let data;
  if (typeof(id) === 'number') {
    const reqDetails = {
      method: API_METHOD.GET,
      apiUrl: `${API_URL.ONE_CUSTOMER_INV}${id}`
    };
    data = await FetchApiResponse(reqDetails);
  }
  return data;
}

export const getSalesBreakdownData = async(id, year) => {
  let data;
  if (typeof(id) === 'number') {
    let apiUrl = year ? `${API_URL.SALES_BREAKDOWN}${id}/${year}` : `${API_URL.SALES_BREAKDOWN}${id}`;
    const reqDetails = {
      method: API_METHOD.GET,
      apiUrl
    };
    data = await FetchApiResponse(reqDetails);
  }
  return data;
}

export const getSalesBreakdownDetailData = async(id) => {
  let data;
  if (typeof(id) === 'number') {
    const reqDetails = {
      method: API_METHOD.GET,
      apiUrl: `${API_URL.SALES_BREAKDOWN_DETAIL}${id}`
    };
    data = await FetchApiResponse(reqDetails);
  }
  return data;
}

export const getS3SalesBreakdownData = async(id, year) => {
  let data;
  if (typeof(id) === 'number') {
    let apiUrl = year ? `${API_URL.S3_SALES_BREAKDOWN}${id}/${year}` : `${API_URL.S3_SALES_BREAKDOWN}${id}`;
    const reqDetails = {
      method: API_METHOD.GET,
      apiUrl
    };
    data = await FetchApiResponse(reqDetails);
  }
  return data;
}

export const getS3SalesBreakdownDetailData = async(id) => {
  let data;
  if (typeof(id) === 'number') {
    const reqDetails = {
      method: API_METHOD.GET,
      apiUrl: `${API_URL.S3_SALES_BREAKDOWN_DETAIL}${id}`
    };
    data = await FetchApiResponse(reqDetails);
  }
  return data;
}

export const getSalesByMonthDetailData = async(id) => {
  let data;
  if (typeof(id) === 'number') {
    const reqDetails = {
      method: API_METHOD.GET,
      apiUrl: `${API_URL.SALES_BY_MONTH_DETAIL}${id}`
    };
    data = await FetchApiResponse(reqDetails);
  }
  return data;
}

export const getTopContactsData = async(id) => {
  let data;
  if (typeof(id) === 'number') {
    const reqDetails = {
      method: API_METHOD.GET,
      apiUrl: `${API_URL.TOP_CONTACTS}${id}`
    };
    data = await FetchApiResponse(reqDetails);
  }
  return data;
}

export const getRecentActivityData = async(id) => {
  let data;
  if (typeof(id) === 'number') {
    const reqDetails = {
      method: API_METHOD.GET,
      apiUrl: `${API_URL.RECENT_ACTIVITY}${id}`
    };
    data = await FetchApiResponse(reqDetails);
  }
  return data;
}

export const getCustomerData = async(id) => {
  let data;
  if (typeof(id) === 'number') {
    const reqDetails = {
      method: API_METHOD.GET,
      apiUrl: `${API_URL.CUSTOMER}${id}`
    };
    data = await FetchApiResponse(reqDetails);
  }
  return data;
}

export const getOneCustomerInvDetailData = async(id) => {
  let data;
  if (typeof(id) === 'number') {
    const reqDetails = {
      method: API_METHOD.GET,
      apiUrl: `${API_URL.ONE_CUSTOMER_INV_DETAIL}${id}`
    };
    data = await FetchApiResponse(reqDetails);
  }
  return data;
}