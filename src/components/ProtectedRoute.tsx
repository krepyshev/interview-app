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

  // Если пользователь авторизован и маршрут помечен как reverse (например, /login), перенаправляем на /
  if (reverse && user) {
    return <Navigate to="/" />;
  }

  // Если пользователь не авторизован, перенаправляем на /login
  if (!reverse && !user) {
    return <Navigate to="/login" />;
  }

  // Если роль задана, проверяем её соответствие
  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }
  // Рендерим вложенные маршруты, если все условия выполнены
  return <Outlet />;
};

export default ProtectedRoute;
