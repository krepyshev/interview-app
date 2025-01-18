import { useState } from "react";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !text || !category) {
      alert("Все поля обязательны для заполнения");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            text,
            category,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при добавлении вопроса");
      }

      // Очищаем форму и показываем сообщение об успехе
      setTitle("");
      setText("");
      setCategory("");
      setSuccessMessage("Вопрос успешно добавлен!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Произошла неизвестная ошибка");
      }
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h1>Admin Panel</h1>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Заголовок:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            Текст:
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                minHeight: "100px",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Категория:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
          Добавить вопрос
        </button>
      </form>
    </div>
  );
};

export default Admin;
