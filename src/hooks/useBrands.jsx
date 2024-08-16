import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePublicClient from "./usePublicClient";

const useBrands = () => {
  const { loading } = useAuth();
  const publicClient = usePublicClient();
  const { data, refetch } = useQuery({
    queryKey: ["brands"],
    enabled: !loading,
    queryFn: async () => {
      const res = await publicClient.get(`/brands`);
      return res.data;
    },
  });
  return [data || {}, refetch];
};

export default useBrands;
