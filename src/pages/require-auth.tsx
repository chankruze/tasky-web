import { Navigate, Outlet } from "react-router";
import useAuthStore from "@/stores/useAuthStore";
import Layout from "./layout";

interface RequireAuthProps {
  redirectTo: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ redirectTo }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <Layout>
      <Outlet />;
    </Layout>
  );
};

export default RequireAuth;
