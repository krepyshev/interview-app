import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
}

interface AddQuestionFormProps {
  onQuestionAdded?: () => void;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({
  onQuestionAdded,
}) => {
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
      } catch {
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

      setTitle("");
      setText("");
      setCategory("");
      setSuccessMessage("Вопрос успешно добавлен!");
      setTimeout(() => setSuccessMessage(""), 3000);

      if (onQuestionAdded) {
        onQuestionAdded();
      }
    } catch {
      setErrorMessage("Ошибка при добавлении вопроса");
    }
  };

  return (
    <div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Заголовок:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Текст:</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div>
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
        <button type="submit">Добавить вопрос</button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
