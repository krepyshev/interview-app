import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button/Button";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Ошибка регистрации");
        return;
      }

      setSuccess(data.message);
      setError("");
      setTimeout(() => navigate("/login"), 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Ошибка сервера");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
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
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default RegisterForm;
