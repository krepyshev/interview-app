import { useEffect, useState } from "react";

interface QuestionsTableProps {
  refresh?: boolean;
}

const QuestionsTable: React.FC<QuestionsTableProps> = ({ refresh }) => {
  const [questions, setQuestions] = useState<
    { _id: string; title: string; category: string }[]
  >([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/questions`
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки вопросов");
        }
        const data = await response.json();
        setQuestions(data);
      } catch {
        console.error("Ошибка при загрузке вопросов");
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
    } catch {
      console.error("Ошибка при удалении вопроса");
    }
  };

  return (
    <div>
      <h2>Список вопросов</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок</th>
            <th>Категория</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question._id}>
              <td>{question._id}</td>
              <td>{question.title}</td>
              <td>{question.category}</td>
              <td>
                <button onClick={() => handleDelete(question._id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsTable;
