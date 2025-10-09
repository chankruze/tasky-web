import { Navigate, Outlet } from "react-router";
import useAuthStore from "@/stores/useAuthStore";

interface RequireAuthProps {
  redirectTo: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ redirectTo }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
