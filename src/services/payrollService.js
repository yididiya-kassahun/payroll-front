import { QueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../config";
import axios from "axios";

export const queryClient = new QueryClient();

export const fetchPayroll = async (tin) => {
  const payroll = await axios.get(`${API_BASE_URL}/payroll?employee_tin=${tin}`);
  return payroll.data;
};