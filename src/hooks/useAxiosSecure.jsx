import axios from "axios";
import { useContext, useMemo } from "react";
import { AuthContext } from "@/context";

const useAxiosSecure = () => {
  const { token, saveAuthData, logout, user } =
    useContext(AuthContext);

  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
      timeout: 30000,
    });

    // Attach token to all requests
    instance.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle 401 errors (expired or invalid token)
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Token refresh will be handled by MERN backend later
        if (error.response && error.response.status === 401) {
          console.warn("Unauthorized — backend not connected yet");
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [token, saveAuthData, logout, user]);

  return axiosSecure;
};

export default useAxiosSecure;
