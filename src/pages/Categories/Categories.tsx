import { Link } from "react-router-dom";
import { getCategories } from "../../utils/questionsStorage";

const Categories = () => {
  const categories = getCategories();

  if (categories.length === 0) {
    return <div>Категории пока не добавлены.</div>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h1>Категории</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {categories.map((category) => (
          <li key={category} style={{ margin: "10px 0" }}>
            <Link
              to={`/questions/${category}`}
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
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
