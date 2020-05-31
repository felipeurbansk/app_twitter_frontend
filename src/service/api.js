import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Crossdomain = true;
  }

  return config;
});

export default api;
