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
              <Link
                to="/admin"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  padding: "5px 10px",
                  backgroundColor: "purple",
                  borderRadius: "5px",
                }}
              >
                Админка
              </Link>
            )}
            <Button variant="secondary" onClick={handleLogout}>
              Выйти
            </Button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "#fff",
                textDecoration: "none",
                padding: "5px 10px",
                backgroundColor: "blue",
                borderRadius: "5px",
              }}
            >
              Войти
            </Link>
            <Link
              to="/register"
              style={{
                color: "#fff",
                textDecoration: "none",
                padding: "5px 10px",
                backgroundColor: "green",
                borderRadius: "5px",
              }}
            >
              Регистрация
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
