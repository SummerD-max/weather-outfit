import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/login");
      toast.success("已登出");
      queryClient.removeQueries();
    },
    onError: (err) => {
      toast.error(`登出失败: ${err.message}`);
    },
  });

  return { logout, isLoggingOut };
}
