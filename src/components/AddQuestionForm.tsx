import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
}

const AddQuestionForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        if (!response.ok) {
          throw new Error("Не удалось загрузить категории");
        }
        const data: Category[] = await response.json();
        setCategories(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setErrorMessage("Ошибка загрузки категорий");
      }
    };

    fetchCategories();
  }, []);

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
    <div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
          <label>Категория:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Выберите категорию
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
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

export default AddQuestionForm;
