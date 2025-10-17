import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import type { Setting } from "../../types/Setting";
import { useUser } from "../authentication/useUser";

export function useSettings() {
  const { user } = useUser();

  const {
    data: settings,
    isLoading,
    isError,
    error,
  } = useQuery<Setting>({
    queryKey: ["settings"],
    queryFn: () => getSettings(user?.id),
  });

  return { settings, isLoading, isError, error };
}
