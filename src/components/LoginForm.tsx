import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import Button from "./Button/Button";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Ошибка авторизации");
        return;
      }

      // Сохраняем данные в глобальном состоянии через Zustand
      useAuthStore.getState().setUser(data);

      // Сохраняем данные в localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // Перенаправляем пользователя на главную страницу
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Ошибка сервера");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Имя пользователя:
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
      <Button type="submit" variant="primary">
        Войти
      </Button>
    </form>
  );
};

export default LoginForm;
