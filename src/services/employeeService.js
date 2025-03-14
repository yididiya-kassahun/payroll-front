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
  console.log("allownace response ", response);
  return response;
};

export const editAllowance = async (fields) => {
  const response = await axios.post(`${API_BASE_URL}/allowance`, fields);
  return response;
};

export const addLoan = async (fields) => {
  try {
    console.log("loan fields ", fields);
    const response = await axios.post(`${API_BASE_URL}/loan`, fields);
    return response.data;
  } catch (error) {
    console.error("Error adding loan:", error);
    throw error;
  }
};

export const fetchLoanHistory = async (tin) => {
  const loan = await axios.get(`${API_BASE_URL}/loan?tin_number=${tin}`);
  return loan.data;
};

export const fetchTaxes= async (tin) => {
  const tax = await axios.get(`${API_BASE_URL}/tax?tin_number=${tin}`);
  return tax.data;
};