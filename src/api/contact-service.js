import axios from "axios";
import authHeader from "../helpers/functions/auth-header";
import { settings } from "../helpers/settings";

const API_URL = settings.apiURL;

// USER ENDPOINTS
export const sendMessage = (message) => {
  return axios.post(`${API_URL}/contactmessage/visitors`, message);
};


// ADMIN ENDPOINT

export const getMessagesByPage = (page=0, size=20, sort="id", direction="DESC") => {
  return axios.get(`${API_URL}/contactmessage/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`, {headers: authHeader() });
};

export const getMessage = (id) => {
  return axios.get(`${API_URL}/contactmessage/${id}`, {headers: authHeader() });
};

export const deleteMessage = (id) => {
  return axios.delete(`${API_URL}/contactmessage/${id}`, {headers: authHeader() });
};
