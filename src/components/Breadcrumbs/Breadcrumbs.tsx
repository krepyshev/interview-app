import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";

const Breadcrumbs = () => {
  const location = useLocation();

  const paths = location.pathname
    .split("/")
    .filter((path) => path) // Убираем пустые части
    .map((path, index, arr) => ({
      name: path.charAt(0).toUpperCase() + path.slice(1), // Делаем первую букву заглавной
      path: "/" + arr.slice(0, index + 1).join("/"), // Генерируем путь для ссылки
    }));

  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
        {paths.map((crumb, index) => (
          <li key={index}>
            {index === paths.length - 1 ? (
              <span>{crumb.name}</span> // Последняя крошка — просто текст
            ) : (
              <Link to={crumb.path}>{crumb.name}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
