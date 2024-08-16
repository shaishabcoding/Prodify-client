import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePublicClient from "./usePublicClient";

const useProducts = () => {
  const { loading } = useAuth();
  const publicClient = usePublicClient();
  const { data, refetch } = useQuery({
    queryKey: ["products"],
    enabled: !loading,
    queryFn: async () => {
      const res = await publicClient.get(`/products`);
      return res.data;
    },
  });
  return [data || {}, refetch];
};

export default useProducts;
