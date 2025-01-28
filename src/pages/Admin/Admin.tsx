import { useState } from "react";
import AddQuestionForm from "../../components/AddQuestionForm";
import AddCategoryForm from "../../components/AddCategoryForm";
import QuestionsTable from "../../components/QuestionsTable/QuestionsTable";
import CategoriesTable from "../../components/CategoriesTable/CategoriesTable";
import MassUploadForm from "../../components/MassUploadForm";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import styles from "./Admin.module.scss";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<
    "questions" | "categories" | "upload"
  >("questions");
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [refreshQuestions, setRefreshQuestions] = useState(false);

  const refreshCategoriesTable = () => setRefreshCategories((prev) => !prev);
  const refreshQuestionsTable = () => setRefreshQuestions((prev) => !prev);

  return (
    <AdminLayout>
      <h1 className={styles.title}>Admin Panel</h1>
      <div className={styles.tabButtons}>
        <button onClick={() => setActiveTab("questions")}>Вопросы</button>
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
    </AdminLayout>
  );
};

export default Admin;
