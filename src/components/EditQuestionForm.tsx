import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
}

interface Question {
  _id: string;
  title: string;
  text: string;
  category: string;
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
  const [categories, setCategories] = useState<Category[]>([]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...question, title, text, category });
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
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default EditQuestionForm;
