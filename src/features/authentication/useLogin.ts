import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, type LoginParams } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }: LoginParams) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success("登录成功");
      console.log(user);
      queryClient.setQueryData(["user"], user);
      // 可以在这里执行登录成功后的操作，比如导航到主页
      navigate("/");
    },
    onError: (err) => {
      toast.error(`登录失败: ${err.message}`);
    },
  });

  return { login, isLoggingIn };
}
