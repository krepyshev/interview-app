import { useState } from "react";

const AddCategoryForm = ({
  onCategoryAdded,
}: {
  onCategoryAdded: () => void;
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newCategory }),
        }
      );

      if (!response.ok) throw new Error("Не удалось добавить категорию");

      setSuccessMessage("Категория добавлена успешно");
      setNewCategory("");
      setTimeout(() => {
        setSuccessMessage(null);
        onCategoryAdded();
      }, 3000);
    } catch (err) {
      console.error("Ошибка добавления категории:", err);
    }
  };

  return (
    <div>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Новая категория"
      />
      <button onClick={handleAddCategory}>Добавить</button>
    </div>
  );
};

export default AddCategoryForm;
