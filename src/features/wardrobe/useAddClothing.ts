import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClothingItem } from "../../types/WarDrobe";
import { useUser } from "../authentication/useUser";
import { addClothingItem } from "../../services/apiWardorbe";
import toast from "react-hot-toast";

export function useAddClothing() {
  const { user } = useUser();

  const userId = user!.id;

  const queryClient = useQueryClient();

  const { mutate: addClothing, isPending } = useMutation({
    mutationFn: ({
      newClothing,
    }: {
      newClothing: Omit<ClothingItem, "id" | "userId">;
    }) => addClothingItem({ ...newClothing, userId }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wardrobe", userId] });
      toast.success("Successfully added clothing item");
    },
    onError: (err) => {
      toast.error(`Failed to add clothing item: ${err.message}`);
    },
  });

  return { addClothing, isPending };
}
