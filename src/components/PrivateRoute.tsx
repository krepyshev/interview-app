import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ role }: { role?: "user" | "admin" }) => {
  const { user } = useAuth();

  // Если пользователь не авторизован, перенаправляем на /login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Если задана роль и она не совпадает с ролью пользователя, перенаправляем на /
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  // Если всё в порядке, рендерим вложенные маршруты
  return <Outlet />;
};

export default PrivateRoute;
