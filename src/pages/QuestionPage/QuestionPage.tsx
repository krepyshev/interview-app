import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import CodeBlock from "../../components/CodeBlock/CodeBlock";
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

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!question) return <div>Вопрос не найден</div>;

  return (
    <ContentLayout>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Назад
      </button>
      <h1 className={styles.title}>{question.title}</h1>
      <Markdown
        options={{
          overrides: {
            code: {
              component: CodeBlock,
            },
          },
        }}
        className={styles.text}
      >
        {question.text}
      </Markdown>
      <div className={styles.details}>
        <p>
          <strong>Сложность:</strong> {question.difficulty}
        </p>
        <p>
          <strong>Время для изучения:</strong> {question.timeToLearn} мин
        </p>
      </div>
    </ContentLayout>
  );
};

export default QuestionPage;
