import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import ThemeSwitcher from "./ThemeSwitcher";
import Button from "./Button/Button";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <div>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          InterviewApp
        </Link>
      </div>
      <ThemeSwitcher />
      <nav style={{ display: "flex", gap: "15px" }}>
        {user ? (
          <>
            <span>Привет, {user.username}!</span>
            {user.role === "admin" && (
              <Button onClick={() => navigate("/admin")} variant="primary">
                Админ-панель
              </Button>
            )}
            <Button variant="secondary" onClick={handleLogout}>
              Выйти
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate("/login")} variant="primary">
              Войти
            </Button>
            <Button onClick={() => navigate("/register")} variant="secondary">
              Регистрация
            </Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
