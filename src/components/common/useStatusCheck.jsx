import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export const useStatusCheck = () => {
  const axiosSecure = useAxiosSecure();

  const { data, ...rest } = useQuery({
    queryKey: ["status-check"],
    queryFn: async () => {
      const res = await axiosSecure.get("/access-status/");
      return res.data; // assuming the API returns { data: ... }
    },
  });

  // directly return data
  return { data: data?.data, ...rest };
};
