import axios from "axios";
import { BASE_URL } from "../constants";
import Auth from "./auth";

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 10,
  headers: {
    "content-type": "application/json;charset=utf-8",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = Auth.getToken();
    config.headers.Authorization = "Bearer " + token;
    return config;
  },
  (err) => {
    return Promise.reject(err.response)
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
  },
  (err) => {
    return Promise.reject(err.response)
  }
);

export default AxiosInstance;