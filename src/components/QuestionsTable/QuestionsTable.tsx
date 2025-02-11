import { useEffect, useState } from "react";
import styles from "./QuestionsTable.module.scss";
import QuestionModal from "../Modal/QuestionModal";

interface Question {
  _id: string;
  title: string;
  text: string;
  category: string;
  difficulty: string;
  timeToLearn: number;
}

interface QuestionsTableProps {
  refresh?: boolean;
}

const QuestionsTable: React.FC<QuestionsTableProps> = ({ refresh }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/questions`
        );
        if (!response.ok) throw new Error("Ошибка загрузки вопросов");
        const data: Question[] = await response.json();
        setQuestions(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    const user = JSON.parse(localStorage.getItem("user") || "null");
    setIsAdmin(user?.role === "admin");
  }, [refresh]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? questions.length - 1 : prevIndex - 1
    );
  };

  const handleSave = async (updatedQuestion: Question) => {
    try {
      const updatedData = {
        ...updatedQuestion,
        timeToLearn: Math.ceil(
          updatedQuestion.text.trim().split(/\s+/).length / 200
        ),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/questions/${updatedQuestion._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Ошибка сохранения вопроса");

      const updatedResponse = await response.json();

      setQuestions((prev) =>
        prev.map((q) =>
          q._id === updatedResponse.question._id ? updatedResponse.question : q
        )
      );
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
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
            {questions.map((question, index) => (
              <tr key={question._id}>
                <td>{question._id}</td>
                <td>{question.title}</td>
                <td>{question.category}</td>
                <td>
                  <button
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsModalOpen(true);
                    }}
                  >
                    Открыть
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <QuestionModal
            question={questions[currentIndex]}
            isAdmin={isAdmin}
            onClose={() => setIsModalOpen(false)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSave={handleSave}
          />
        )}
      </div>
    </>
  );
};

export default QuestionsTable;
