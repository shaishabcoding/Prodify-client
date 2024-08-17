import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePublicClient from "./usePublicClient";

const useCategories = () => {
  const { loading } = useAuth();
  const publicClient = usePublicClient();
  const { data, refetch } = useQuery({
    queryKey: ["categories"],
    enabled: !loading,
    queryFn: async () => {
      const res = await publicClient.get(`/categories`);
      return res.data;
    },
  });
  return [data || [], refetch];
};

export default useCategories;
