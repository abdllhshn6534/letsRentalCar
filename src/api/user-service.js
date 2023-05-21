import axios from "axios";
import authHeader from "../helpers/functions/auth-header";
import { settings } from "../helpers/settings";

const API_URL = settings.apiURL;

// USER ENDPOINTS
export const register = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const login = (credential) => {
  return axios.post(`${API_URL}/login`, credential);
};

export const getUser = () => {
  return axios.get(`${API_URL}/user`, { headers: authHeader() });
};

export const updateUser = (user) => {
  return axios.put(`${API_URL}/user`, user, { headers: authHeader() });
};

export const updatePassword = (credential) => {
  return axios.patch(`${API_URL}/user/auth`, credential, {
    headers: authHeader(),
  });
};

// ADMIN ENDPOINT
export const getUsersByPage = (
  page = 0,
  size = 20,
  sort = "id",
  direction = "DESC"
) => {
  return axios.get(
    `${API_URL}/user/auth/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    { headers: authHeader() }
  );
};

export const downloadUsers = () => {
  return axios.get(`${API_URL}/excel/download/users`, {
    headers: {
      ...authHeader(),
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: "blob"
  });
};


export const getUserById = (id) => {
  return axios.get(`${API_URL}/user/${id}/auth`, { headers: authHeader() });
};

export const deleteUserById = (id) => {
  return axios.delete(`${API_URL}/user/${id}/auth`, { headers: authHeader() });
};

export const updateUserById = (id, user) => {
  return axios.put(`${API_URL}/user/${id}/auth`, user, { headers: authHeader() });
};