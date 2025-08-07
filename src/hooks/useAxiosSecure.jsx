import axios from "axios";
import { useAuth } from "./useAuth";

const useAxiosSecure = () => {
  const { token } = useAuth(); // useAuth must return non-null context
 console.log(token)
  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
  });

  axiosSecure.interceptors.request.use((config) => {
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  });

  return axiosSecure;
};

export default useAxiosSecure;
