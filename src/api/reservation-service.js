import axios from "axios";
import authHeader from "../helpers/functions/auth-header";
import { settings } from "../helpers/settings";

const API_URL = settings.apiURL;

// USER ENDPOINTS
export const isVehicleAvailable = (dto) => {
  const { carId, pickUpDateTime, dropOffDateTime } = dto;
  return axios.get(
    `${API_URL}/reservations/auth?carId=${carId}&pickUpDateTime=${pickUpDateTime}&dropOffDateTime=${dropOffDateTime}`,
    { headers: authHeader() }
  );
};

export const createReservation = (carId, reservation) => {
  return axios.post(`${API_URL}/reservations/add?carId=${carId}`, reservation, {
    headers: authHeader(),
  });
};

export const getReservations = (page=0, size=20, sort="pickUpTime", direction="DESC") => {
  return axios.get(`${API_URL}/reservations/auth/all?page=${page}&size=${size}&sort=${sort}&direction=${direction}`, {
    headers: authHeader(),
  });
};

export const getReservation = (id) => {
  return axios.get(`${API_URL}/reservations/${id}/auth`, {
    headers: authHeader(),
  });
};


// ADMIN ENDPOINTS
export const getReservationsByPage = (page=0, size=20, sort="id", direction="DESC") => {
  return axios.get(`${API_URL}/reservations/admin/all/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`, {
    headers: authHeader(),
  });
};

export const downloadReservations = () => {
  return axios.get(`${API_URL}/excel/download/reservations`, {
    headers: {
      ...authHeader(),
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: "blob"
  });
};


export const getReservationById = (id) => {
  return axios.get(`${API_URL}/reservations/${id}/admin`, {
    headers: authHeader(),
  });
};

export const updateReservationById = (carId, reservationId, reservation) => {
  return axios.put(`${API_URL}/reservations/admin/auth?carId=${carId}&reservationId=${reservationId}`, reservation, {
    headers: authHeader(),
  });
};

export const deleteReservationById = (id) => {
  return axios.delete(`${API_URL}/reservations/admin/${id}/auth`, {
    headers: authHeader(),
  });
};