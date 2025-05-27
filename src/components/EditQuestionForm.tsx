import { useEffect, useState } from "react";
import Button from "./Button/Button";

interface Category {
  _id: string;
  name: string;
}

interface Question {
  _id: string;
  title: string;
  text: string;
  category: string;
  difficulty: string;
}

interface EditQuestionFormProps {
  question: Question;
  onSave: (updatedQuestion: Question) => void;
}

const EditQuestionForm: React.FC<EditQuestionFormProps> = ({
  question,
  onSave,
}) => {
  const [title, setTitle] = useState(question.title);
  const [text, setText] = useState(question.text);
  const [category, setCategory] = useState(question.category);
  const [difficulty, setDifficulty] = useState(question.difficulty);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setTitle(question.title);
    setText(question.text);
    setCategory(question.category);
    setDifficulty(question.difficulty);
  }, [question]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки категорий");
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch {
        console.error("Ошибка при загрузке категорий");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedQuestion = { title, text, category, difficulty };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/questions/${question._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedQuestion),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при сохранении вопроса");
      }

      const data = await response.json();
      onSave(data.question);
    } catch (err) {
      console.error("Ошибка при сохранении вопроса", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Сложность:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="" disabled>
            Выберите сложность
          </option>
          <option value="easy">Простая</option>
          <option value="medium">Средняя</option>
          <option value="hard">Сложная</option>
        </select>
      </div>
      <Button type="submit" disabled={isSaving}>
        {isSaving ? "Сохранение..." : "Сохранить"}
      </Button>
    </form>
  );
};

export default EditQuestionForm;
