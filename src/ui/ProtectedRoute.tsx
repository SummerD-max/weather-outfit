import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router";
import Spinner from "./Spinner";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isLoading && user?.role !== "authenticated") {
        navigate("/login");
      }
    },
    [isLoading, user, navigate],
  );

  if (isLoading) {
    return <Spinner>正在验证身份...</Spinner>;
  }

  if (user?.role === "authenticated") {
    return <>{children}</>;
  }

  return null;
}

export default ProtectedRoute;
