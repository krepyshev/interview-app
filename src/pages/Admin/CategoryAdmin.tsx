import { useState, useEffect } from "react";

const CategoryAdmin = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Загрузка категорий при монтировании компонента
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        if (!response.ok) {
          throw new Error("Не удалось загрузить категории");
        }
        const data = await response.json();
        // Преобразуем массив объектов в массив строк (имен категорий)
        const categoryNames = data.map(
          (category: { name: string }) => category.name
        );
        setCategories(categoryNames);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  // Обработчик добавления новой категории
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      setError("Название категории не может быть пустым");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newCategory }),
        }
      );
      if (!response.ok) {
        throw new Error("Не удалось добавить категорию");
      }
      const newCategoryData = await response.json();

      // Добавляем новую категорию в текущий список
      setCategories((prev) => [...prev, newCategoryData.name]);

      setSuccess("Категория добавлена успешно");
      setNewCategory("");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  // Обработчик удаления категории
  const handleDeleteCategory = async (category: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories/${category}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Не удалось удалить категорию");
      }
      setCategories((prev) => prev.filter((c) => c !== category));
      setSuccess("Категория удалена успешно");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return (
    <div>
      <h1>Управление категориями</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <ul>
        {categories.map((category) => (
          <li key={category}>
            {category}{" "}
            <button onClick={() => handleDeleteCategory(category)}>
              Удалить
            </button>
          </li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Новая категория"
        />
        <button onClick={handleAddCategory}>Добавить категорию</button>
      </div>
    </div>
  );
};

export default CategoryAdmin;
