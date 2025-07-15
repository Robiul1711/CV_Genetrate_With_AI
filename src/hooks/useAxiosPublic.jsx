import axios from "axios";
console.log(import.meta.env.VITE_API_URL);
const useAxiosPublic = () => {

 
  const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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