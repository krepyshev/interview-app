import { useState, useEffect } from "react";

interface Category {
  _id: string;
  name: string;
}

const CategoriesTable = ({ refresh }: { refresh: boolean }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        if (!response.ok) {
          throw new Error("Не удалось загрузить категории");
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Не удалось удалить категорию");
      }
      setCategories((prev) => prev.filter((category) => category._id !== id));
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  if (loading) return <div>Загрузка категорий...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category._id}>
            <td>{category.name}</td>
            <td>
              <button onClick={() => handleDelete(category._id)}>
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoriesTable;
