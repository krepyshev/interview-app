import { useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  username: string;
  password: string;
  role: "user";
};

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setError("Все поля обязательны для заполнения.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают.");
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((user) => user.username === username)) {
      setError("Пользователь с таким именем уже существует.");
      return;
    }

    const newUser: User = { username, password, role: "user" };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    navigate("/login");
  };

  return (
    <form
      onSubmit={handleRegister}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginBottom: "15px" }}>
        <label>
          Имя пользователя:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>
          Подтверждение пароля:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: "16px",
          borderRadius: "4px",
        }}
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
