import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../config";

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

export const fetchEmployees = async () => {
  const employees = await authAxios.get("/employees");
  return employees.data;
};

export const addEmployee = async (fields) => {
  const response = await authAxios.post("/employee", fields);
  return response;
};

export const updateEmployee = async (employeeData) => {
  const response = await authAxios.put(
    `${API_BASE_URL}/employee`,
    employeeData
  );
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await authAxios.post(
    `${API_BASE_URL}/deleteEmployee/${id}`
  );
  return response;
};

export const fetchAllowance = async () => {
  const allowance = await authAxios.get("/allowance");
  return allowance.data;
};

export const addAllowance = async (fields) => {
  const response = await authAxios.post("/allowance", fields);
  console.log("allownace response ", response);
  return response;
};

export const editAllowance = async (fields) => {
  const response = await authAxios.put("/allowance", fields);
  return response;
};

export const deleteAllowance = async (id) => {
const response = await authAxios.post(
    `${API_BASE_URL}/deleteAllowance/${id}`
  );
  return response;
}

export const addLoan = async (fields) => {
  try {
    console.log("loan fields ", fields);
    const response = await authAxios.post("/loan", fields);
    return response.data;
  } catch (error) {
    console.error("Error adding loan:", error);
    throw error;
  }
};

export const fetchLoanHistory = async (tin) => {
  const loan = await authAxios.get(`/loan?tin_number=${tin}`);
  return loan.data;
};

export const fetchTaxes = async (tin) => {
  const tax = await authAxios.get(`/tax?tin_number=${tin}`);
 // console.log("tax ", tax.data);
  return tax.data;
};

export const fetchStat = async () => {
  const dashStat = await authAxios.get("/dashboard-stat");
  return dashStat.data;
};
