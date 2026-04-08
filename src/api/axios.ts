import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});
axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

export default axiosApi;
