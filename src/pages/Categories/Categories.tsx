import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Category {
  name: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        if (!response.ok) {
          throw new Error("Ошибка при загрузке категорий");
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (categories.length === 0) {
    return <div>Категории пока не добавлены.</div>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h1>Категории</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {categories.map((category) => (
          <li key={category.name} style={{ margin: "10px 0" }}>
            <Link
              to={`/questions/${category.name}`}
              style={{
                textDecoration: "none",
                color: "blue",
                fontSize: "18px",
                padding: "10px",
                display: "block",
                background: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
