import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePublicClient from "./usePublicClient";

const useProducts = (
  page = 0,
  query = "",
  sort = "",
  brand = "",
  category = ""
) => {
  const { loading } = useAuth();
  const publicClient = usePublicClient();
  const { data, refetch, isFetching, isPreviousData } = useQuery({
    queryKey: ["products", page, query, sort],
    enabled: !loading,
    queryFn: async () => {
      const res = await publicClient.get(
        `/products?search=${query}&offset=${
          page * 10
        }&sort=${sort}&brand=${brand}&category=${category}`
      );
      return res.data;
    },
    keepPreviousData: false,
  });
  return [data || {}, refetch, isFetching, isPreviousData];
};

export default useProducts;
