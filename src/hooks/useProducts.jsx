import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePublicClient from "./usePublicClient";

const useProducts = (
  page = 0,
  query = "",
  sort = "",
  brand = "",
  category = "",
  min = 0,
  max = 0
) => {
  const { loading } = useAuth();
  const publicClient = usePublicClient();
  const { data, refetch, isFetching, isLoading, isPending, isPreviousData } =
    useQuery({
      queryKey: ["products", page, query, sort],
      enabled: !loading,
      queryFn: async () => {
        const res = await publicClient.get(
          `/products?search=${query}&offset=${
            page * 10
          }&sort=${sort}&brand=${brand}&category=${category}&minPrice=${
            min == 0 ? "" : min
          }&maxPrice=${max == 0 ? "" : max}`
        );
        console.log(
          `/products?search=${query}&offset=${
            page * 10
          }&sort=${sort}&brand=${brand}&category=${category}&minPrice=${
            min == 0 ? "" : min
          }&maxPrice=${max == 0 ? "" : max}`
        );

        return res.data;
      },
      keepPreviousData: false,
    });
  return [
    data || {},
    refetch,
    isFetching || isPending || isLoading,
    isPreviousData,
  ];
};

export default useProducts;
