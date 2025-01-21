import { useEffect, useState } from "react";
import styles from "./QuestionsTable.module.scss";

interface QuestionsTableProps {
  refresh?: boolean;
}

interface Question {
  _id: string;
  title: string;
  category: string;
}

const QuestionsTable: React.FC<QuestionsTableProps> = ({ refresh }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/questions`
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки вопросов");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/questions/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Не удалось удалить вопрос");
      }
      setQuestions((prev) => prev.filter((question) => question._id !== id));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  if (loading) {
    return <div>Загрузка вопросов...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <h2 className={styles.title}>Список вопросов</h2>
      <div className={styles["table-container"]}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Заголовок</th>
              <th>Категория</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question._id}>
                <td>{question._id}</td>
                <td>{question.title}</td>
                <td>{question.category}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(question._id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default QuestionsTable;
