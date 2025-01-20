import { useState } from "react";
import AddQuestionForm from "../../components/AddQuestionForm";
import AddCategoryForm from "../../components/AddCategoryForm";
import QuestionsTable from "../../components/QuestionsTable";
import CategoriesTable from "../../components/CategoriesTable";
import MassUploadForm from "../../components/MassUploadForm";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<
    "questions" | "categories" | "upload"
  >("questions");
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [refreshQuestions, setRefreshQuestions] = useState(false);

  const refreshCategoriesTable = () => setRefreshCategories((prev) => !prev);
  const refreshQuestionsTable = () => setRefreshQuestions((prev) => !prev);

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h1>Admin Panel</h1>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("questions")}
          style={{ marginRight: "10px" }}
        >
          Вопросы
        </button>
        <button onClick={() => setActiveTab("categories")}>Категории</button>
        <button onClick={() => setActiveTab("upload")}>
          Массовая загрузка
        </button>
      </div>

      {activeTab === "questions" && (
        <>
          <AddQuestionForm onQuestionAdded={refreshQuestionsTable} />
          <QuestionsTable refresh={refreshQuestions} />
        </>
      )}
      {activeTab === "categories" && (
        <>
          <AddCategoryForm onCategoryAdded={refreshCategoriesTable} />
          <CategoriesTable refresh={refreshCategories} />
        </>
      )}
      {activeTab === "upload" && <MassUploadForm />}
    </div>
  );
};

export default Admin;
