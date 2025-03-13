import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../config";

export const queryClient = new QueryClient();

export const fetchEmployees = async () => {
  const employees = await axios.get(`${API_BASE_URL}/employees`);
  return employees.data;
};

export const addEmployee = async (fields) => {
  const response = await axios.post(`${API_BASE_URL}/employee`, fields);
  return response;
};

export const fetchAllowance = async () => {
  const allowance = await axios.get(`${API_BASE_URL}/allowance`);
  return allowance.data;
};

export const addAllowance = async (fields) => {
  const response = await axios.post(`${API_BASE_URL}/allowance`, fields);
  return response;
};

export const editAllowance = async (fields) => {
  const response = await axios.post(`${API_BASE_URL}/allowance`, fields);
  return response;
};