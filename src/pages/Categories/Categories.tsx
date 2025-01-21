import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Categories.module.scss";
import ContentLayout from "../../layouts/ContentLayout/ContentLayout";

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
    <ContentLayout>
      <h1 className={styles.heading}>Категории</h1>
      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.name} className={styles.card}>
            <Link
              to={`/questions/${category.name}`}
              className={styles.cardLink}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </ContentLayout>
  );
};

export default Categories;
