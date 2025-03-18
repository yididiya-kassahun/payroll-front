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

export const fetchPayroll = async (tin) => {
  const payroll = await authAxios.get(
    `${API_BASE_URL}/payroll?employee_tin=${tin}`
  );
  return payroll.data;
};

export const refreshPayroll = async (tin) => {
  const refreshPayroll = await authAxios.post(
    `${API_BASE_URL}/payroll?employee_tin=${tin}`
  );

  return refreshPayroll;
};

export const response = async (format) => {
  await authAxios.get(`${API_BASE_URL}/reports/payroll?format=${format}`, {
    responseType: "blob",
  });
};

export const sendEmailToEmployee = async ({ name, email,tinNumber }) => {
  const response = await authAxios.post(`${API_BASE_URL}/sendEmail`, {
    name,
    email,
    tinNumber
  });
  return response.data;
};
