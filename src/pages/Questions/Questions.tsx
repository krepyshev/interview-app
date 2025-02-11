import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Questions.module.scss";
import ContentLayout from "../../layouts/ContentLayout/ContentLayout";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import QuestionModal from "../../components/Modal/QuestionModal";

interface Question {
  _id: string;
  title: string;
  text: string;
  category: string;
  difficulty: string;
  timeToLearn: number;
}

const Questions = () => {
  const { category } = useParams<{ category: string }>();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!category) return;

    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/questions`
        );
        if (!response.ok) throw new Error("Ошибка загрузки вопросов");
        const data: Question[] = await response.json();
        setQuestions(data.filter((q) => q.category === category));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    const user = JSON.parse(localStorage.getItem("user") || "null");
    setIsAdmin(user?.role === "admin");
  }, [category]);

  const openModal = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const closeModal = () => {
    setCurrentQuestionIndex(null);
  };

  const goToNextQuestion = () => {
    if (
      currentQuestionIndex !== null &&
      currentQuestionIndex < questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex !== null && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
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
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!questions.length) return <div>Вопросов в категории нет.</div>;

  return (
    <ContentLayout>
      <h1 className={styles.heading}>Категория: {category}</h1>
      <div className={styles.cards}>
        {questions.map((question, index) => (
          <QuestionCard
            _id={question._id}
            key={question._id}
            title={question.title}
            timeToLearn={question.timeToLearn}
            difficulty={question.difficulty}
            onOpen={() => openModal(index)}
          />
        ))}
      </div>
      {currentQuestionIndex !== null && (
        <QuestionModal
          question={questions[currentQuestionIndex]}
          isAdmin={isAdmin}
          onClose={closeModal}
          onNext={goToNextQuestion}
          onPrevious={goToPreviousQuestion}
          onSave={handleSave}
        />
      )}
    </ContentLayout>
  );
};

export default Questions;
