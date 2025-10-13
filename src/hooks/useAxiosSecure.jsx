import axios from "axios";
import { useContext, useMemo } from "react";
import { AuthContext } from "@/context";

const useAxiosSecure = () => {
  const { token, saveAuthData, logout, user,refreshToken } = useContext(AuthContext);


  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
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
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // prevent infinite loop
          try {
            const refreshRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/token/refresh/`,
              {
                refresh:refreshToken
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (refreshRes.data?.access) {
              // Save new token
              saveAuthData(
                refreshRes.data.access,
              );

              // Update header and retry original request
              originalRequest.headers.Authorization = `Bearer ${refreshRes.data.access}`;
              return instance(originalRequest);
            } else {
              logout();
            }
          } catch (err) {
            console.error("Refresh token failed", err);
      
          }
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, [token, saveAuthData, logout, user]);

  return axiosSecure;
};

export default useAxiosSecure;