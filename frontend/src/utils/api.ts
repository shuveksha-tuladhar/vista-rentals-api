/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { navigate } from "./navigation";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/401");
      return Promise.reject(error);
    } else if (error?.response?.status === 403) {
      localStorage.removeItem("token");
      navigate("/403");
      return Promise.reject(error);
    } else if (error?.response?.status === 500) {
      navigate("/500");
      return Promise.reject(error);
    }
  }
);

const handleError = (error: any) => {
  return {
    message:
      error?.response?.data?.message ||
      error?.message ||
      "An unexpected error occurred",
    status: error?.response?.status || 500,
  };
};

export const getApi = async <T>(endpoint: string, headers = {}) => {
  try {
    const response = await api.get<T>(endpoint, { headers });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: handleError(error) };
  }
};

export const postApi = async <T>(endpoint: string, data: any, headers = {}) => {
  try {
    const response = await api.post<T>(endpoint, data, { headers });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: handleError(error) };
  }
};

export const putApi = async <T>(endpoint: string, data: any, headers = {}) => {
  try {
    const response = await api.put<T>(endpoint, data, { headers });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: handleError(error) };
  }
};

export const patchApi = async <T>(
  endpoint: string,
  data: any,
  headers = {}
) => {
  try {
    const response = await api.patch<T>(endpoint, data, { headers });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: handleError(error) };
  }
};

export const deleteApi = async <T>(endpoint: string, headers = {}) => {
  try {
    const response = await api.delete<T>(endpoint, { headers });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: handleError(error) };
  }
};
