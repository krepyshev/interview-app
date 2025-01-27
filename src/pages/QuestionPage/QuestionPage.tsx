import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./QuestionPage.module.scss";
import ContentLayout from "../../layouts/ContentLayout/ContentLayout";

interface Question {
  _id: string;
  title: string;
  text: string;
  difficulty: string;
  timeToLearn: number;
  learned: boolean;
}

const QuestionPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/questions/${id}`
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки вопроса");
        }
        const data: Question = await response.json();
        setQuestion(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleLearnedToggle = async () => {
    if (!question) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/questions/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ learned: !question.learned }),
        }
      );
      if (!response.ok) {
        throw new Error("Ошибка обновления статуса выученного");
      }
      setQuestion((prev) =>
        prev ? { ...prev, learned: !prev.learned } : prev
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Ошибка обновления статуса");
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!question) return <div>Вопрос не найден</div>;

  return (
    <ContentLayout>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Назад
      </button>
      <h1 className={styles.title}>{question.title}</h1>
      <p className={styles.text}>{question.text}</p>
      <div className={styles.details}>
        <p>
          <strong>Сложность:</strong> {question.difficulty}
        </p>
        <p>
          <strong>Время для изучения:</strong> {question.timeToLearn} мин
        </p>
      </div>
      <button onClick={handleLearnedToggle} className={styles.learnedButton}>
        {question.learned
          ? "Пометить как невыученный"
          : "Пометить как выученный"}
      </button>
    </ContentLayout>
  );
};

export default QuestionPage;
