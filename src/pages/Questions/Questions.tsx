import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/auth";
import styles from "./Questions.module.scss";
import ContentLayout from "../../layouts/ContentLayout/ContentLayout";

interface Question {
  _id: string;
  title: string;
  text: string;
  category: string;
}

const Questions = () => {
  const { category } = useParams<{ category: string }>();
  const { user } = useAuthStore();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) {
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/questions`
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки вопросов");
        }
        const data: Question[] = await response.json();
        setQuestions(data.filter((q) => q.category === category));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/questions/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Ошибка удаления вопроса");
      }

      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q._id !== id)
      );
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!category) {
    return <div>Категория не указана.</div>;
  }

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (questions.length === 0) {
    return <div>Вопросов в категории "{category}" пока нет.</div>;
  }

  return (
    <ContentLayout>
      <h1 className={styles.heading}>Категория: {category}</h1>
      <input
        type="text"
        placeholder="Поиск вопросов..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <ul className={styles.list}>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <li key={question._id} className={styles.card}>
              <h3 className={styles.cardTitle}>{question.title}</h3>
              <p className={styles.cardText}>{question.text}</p>
              {user?.role === "admin" && (
                <button
                  onClick={() => handleDelete(question._id)}
                  className={styles.deleteButton}
                >
                  Удалить
                </button>
              )}
            </li>
          ))
        ) : (
          <div>Ничего не найдено.</div>
        )}
      </ul>
    </ContentLayout>
  );
};

export default Questions;
