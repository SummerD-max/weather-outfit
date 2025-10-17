import { useQuery } from "@tanstack/react-query";
import { getWardrobe } from "../../services/apiWardorbe";
import { useUser } from "../authentication/useUser";

export function useWardrobe() {
  const { user } = useUser();

  const userId = user!.id;

  const {
    data: wardrobe,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["wardrobe", userId],
    queryFn: () => getWardrobe(userId),
  });

  return { wardrobe, isLoading, isError, error };
}
