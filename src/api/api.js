import { store } from '../store/index.js';
//const API_BASE_URL = 'https://mob.api.transprolog.com/v3';
const API_BASE_URL = 'https://mobile.transprolog.com/v3';

export const getAuthToken = () => {
  return store.getState().session?.ticket;
    // return sessionStorage.getItem('authToken');
};

// Helper function to handle fetch requests
const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}, params = null) => {
  const token = getAuthToken();
  
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...headers
    }
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    console.log('API request:', `${API_BASE_URL}${endpoint}${params? `?${params}` : ''}`, config);
    const response = await fetch(`${API_BASE_URL}${endpoint}${params? `?${params}` : ''}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Example API functions
export const createSession = (data) => apiRequest('/session', 'POST', data);
export const createTenDocs = () => apiRequest('/documents/test', 'POST', {"company_id": "33"}); // DELETE THIS LINE!!!
export const getTestDocuments = () => apiRequest('/documents?page=1&company_id=33'); // DELETE THIS LINE!!!
export const getCompanies = () => apiRequest('/companies');
export const getDocumentsToDeliver = (companyId) => apiRequest(`/documents`, 'GET', null, {}, `page=1&company_id=${companyId}`);
export const getDocumentsDelivered = (number) => apiRequest(`/pods`, 'GET', null, {}, `number=${number}&page=1`); // discover what the number is!!! -> postman requires this as a string parameter

export const createArrival = () => console.log("Implement Arrival API POST request! Give document's id, latitude, longitude and clients number?");
export const deliverDocument = () => console.log("Implement Delivery API PUT request! Give document's id, status, latitude, longitude and clients number?");
export const createMessage = () => console.log("Implement Message API POST request! Fill a form-data with document's id, message, latitude, longitude, clients number? and files.");
export const listPODs = () => console.log("Implement PODs API GET request! Give number of documents to be filtered <string> and page <number>.");
export const createPOD = () => console.log("Implement POD API POST request! Fill a form-data with document's id, message, latitude, longitude, clients number? and files."); // same as create message?
export const createNewTravel = () => console.log("Implement Travel API POST request! Give latitude, longitude and clients number?");
export const createPosition = () => console.log("Implement Position API POST request! Give latitude, longitude, clients number?, accuracy?, speed? and heading?");