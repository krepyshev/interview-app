import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import styles from "./Header.module.scss";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <nav className={styles.nav}>
        {user ? (
          <>
            <span className={styles.welcome}>Привет, {user.username}!</span>
            {user.role === "admin" && (
              <Button onClick={() => navigate("/admin")} variant="primary">
                Админка
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
        <ThemeSwitcher />
      </nav>
    </header>
  );
};

export default Header;
