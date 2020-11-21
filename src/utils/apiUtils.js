import {API_METHOD} from '../constants';

export default async function fetchApiResponse(data, additionalHeaderObj = {}) {
  const startTime = (new Date()).getTime();
  const initObj = {
    method: data.method,
    headers: {
      ...additionalHeaderObj,
    }
  };
  if (data.method === API_METHOD.POST || data.method === API_METHOD.PUT) {
    initObj.body = JSON.stringify(data.request);
  }
  try {
    const response = await fetch(data.apiUrl, initObj);
    if (!response) {
      return null;
    }
    const responseBody = await response.json();
    console.log('API::', data.apiUrl, '::Took::', (((new Date()).getTime() - startTime) / 1000));
    // console.log('API::', data.apiUrl, responseBody);
    return responseBody;
  } catch (e) {
    return null;
  }
}