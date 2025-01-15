import { useParams } from "react-router-dom";
import { getQuestionsByCategory } from "../../utils/questionsStorage";

const Questions = () => {
  const { category } = useParams<{ category: string }>();

  // Получаем вопросы по категории
  const questions = getQuestionsByCategory(category || "");

  if (!category) {
    return <div>Категория не указана.</div>;
  }

  if (questions.length === 0) {
    return <div>Вопросов в категории "{category}" пока нет.</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h1>Категория: {category}</h1>
      <ul>
        {questions.map((question) => (
          <li
            key={question.id}
            style={{
              marginBottom: "20px",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h3>{question.title}</h3>
            <p>{question.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
