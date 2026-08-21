import axios from "axios";
// Public axios instance — baseURL will point to MERN backend when ready
const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    timeout: 30000,
  });
  axiosPublic.interceptors.request.use((config) => {
    config.headers = {
      ...config.headers,
    };
    return config;
  });

  return axiosPublic;
};

export default useAxiosPublic;