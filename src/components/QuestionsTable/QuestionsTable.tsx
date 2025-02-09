import { useEffect, useState } from "react";
import styles from "./QuestionsTable.module.scss";
import Modal from "../Modal/Modal";
import EditQuestionForm from "../EditQuestionForm";

interface QuestionsTableProps {
  refresh?: boolean;
}

interface Question {
  _id: string;
  title: string;
  text: string;
  category: string;
  difficulty: string;
}

const QuestionsTable: React.FC<QuestionsTableProps> = ({ refresh }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

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

  const handleEdit = (question: Question) => {
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedQuestion: Question) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/questions/${updatedQuestion._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedQuestion),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка сохранения вопроса");
      }

      const data = await response.json();

      setQuestions((prev) =>
        prev.map((q) => (q._id === updatedQuestion._id ? data.question : q))
      );

      setIsModalOpen(false);
    } catch (err) {
      console.error("Ошибка при сохранении вопроса", err);
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
                  <button onClick={() => handleEdit(question)}>
                    Редактировать
                  </button>
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
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {currentQuestion && (
            <EditQuestionForm question={currentQuestion} onSave={handleSave} />
          )}
        </Modal>
      </div>
    </>
  );
};

export default QuestionsTable;
