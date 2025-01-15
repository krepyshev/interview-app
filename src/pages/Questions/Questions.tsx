import { useParams } from "react-router-dom";
import { useState } from "react";
import { getQuestionsByCategory } from "../../utils/questionsStorage";

const Questions = () => {
  const { category } = useParams<{ category: string }>();
  const questions = getQuestionsByCategory(category || "");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!category) {
    return <div>Категория не указана.</div>;
  }

  if (questions.length === 0) {
    return <div>Вопросов в категории "{category}" пока нет.</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h1>Категория: {category}</h1>
      <input
        type="text"
        placeholder="Поиск вопросов..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <ul>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <li
              key={question.id}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{question.title}</h3>
              <p>{question.text}</p>
            </li>
          ))
        ) : (
          <div>Ничего не найдено.</div>
        )}
      </ul>
    </div>
  );
};

export default Questions;
