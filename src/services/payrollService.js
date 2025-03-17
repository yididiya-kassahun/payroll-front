import { QueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../config";
import axios from "axios";

export const queryClient = new QueryClient();

export const fetchPayroll = async (tin) => {
  const payroll = await axios.get(
    `${API_BASE_URL}/payroll?employee_tin=${tin}`
  );
  return payroll.data;
};

export const refreshPayroll = async (tin) => {
  const refreshPayroll = await axios.post(
    `${API_BASE_URL}/payroll?employee_tin=${tin}`
  );

  return refreshPayroll;
};

export const response = async (format) => {
  await axios.get(`${API_BASE_URL}/reports/payroll?format=${format}`, {
    responseType: "blob",
  });
};

export const sendEmailToEmployee = async ({ name, email }) => {
  const response = await axios.post(`${API_BASE_URL}/sendEmail`, {
    name,
    email,
  });
  return response.data;
};
