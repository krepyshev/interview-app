import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const ProtectedRoute = ({
  role,
  reverse,
}: {
  role?: "user" | "admin";
  reverse?: boolean;
}) => {
  const user = useAuthStore((state) => state.user);

  if (reverse && user) {
    return <Navigate to="/" />;
  }

  if (!reverse && !user) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
