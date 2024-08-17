import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivateClient from "./usePrivateClient";

const useProduct = (id) => {
  const { loading } = useAuth();
  const privateClient = usePrivateClient();
  const { data, refetch, isFetching, isLoading, isPending } = useQuery({
    queryKey: ["product", id],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get(`/products/${id}`);
      return res.data;
    },
  });
  return [data || {}, refetch, isFetching || isPending || isLoading];
};

export default useProduct;
