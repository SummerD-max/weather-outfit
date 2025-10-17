import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeClothingItem } from "../../services/apiWardorbe";
import type { ClothingItem } from "../../types/WarDrobe";
import toast from "react-hot-toast";

export function useRemoveClothing() {
  const queryClient = useQueryClient();

  const { mutate: removeClothing, isPending: isRemoving } = useMutation({
    mutationFn: (id: ClothingItem["id"]) => removeClothingItem(id),
    onSuccess: () => {
      toast.success("衣物已删除");
      queryClient.invalidateQueries({ queryKey: ["wardrobe"] });
    },
    onError: (err) => {
      toast.error(`删除失败: ${err.message}`);
    },
  });

  return { removeClothing, isRemoving };
}
