import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "../../services/apiSettings";
import { useUser } from "../authentication/useUser";
import toast from "react-hot-toast";
import type { Setting } from "../../types/Setting";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const id = user?.id;

  const { mutate: updateSettings, isPending } = useMutation({
    mutationFn: ({
      settingsToUpdate,
    }: {
      settingsToUpdate: Partial<Setting>;
    }) => updateSettingsApi({ settingsToUpdate, userId: id }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      // queryClient.invalidateQueries({ queryKey: ["weather"] });
      console.log(data);
    },
    onError: (err) => {
      toast.error(`Failed to save: ${(err as Error).message}`);
    },
  });

  return { updateSettings, isPending };
}
