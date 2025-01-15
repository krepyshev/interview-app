import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        backgroundColor: "#282c34",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "20px" }}>Interview App</h1>
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Категории
        </Link>
        {user?.role === "admin" && (
          <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
            Админка
          </Link>
        )}
        {!user ? (
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Войти
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Выйти
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
