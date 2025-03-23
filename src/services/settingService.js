import { QueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../config";
import axios from "axios";

export const queryClient = new QueryClient();

const getToken = () => localStorage.getItem("authToken");

const authAxios = axios.create({
  baseURL: API_BASE_URL,
});

authAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchRates= async () => {
  const rates = await authAxios.get(
    `${API_BASE_URL}/rates`
  );
  return rates.data;
};

export const updateRates = async (fields) => {
  const response = await authAxios.put(
    `${API_BASE_URL}/rates`,
    fields
  );
  return response;
};