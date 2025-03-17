import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../config";

export const queryClient = new QueryClient();

export const signin = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signin`, credentials);
  return response.data;
};

export const signup = async (fields) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, fields);
  return response;
};

export const changePassword = async (fields) => {
  const token = localStorage.getItem("authToken");
  const response = await axios.post(`${API_BASE_URL}/auth/changepass`, fields, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
