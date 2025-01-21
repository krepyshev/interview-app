import { useEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.scss";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (document.documentElement.dataset.theme as "light" | "dark") || "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className={styles.switcher}
      aria-label="Переключить тему"
    >
      {theme === "light" ? (
        <FaMoon className={styles.icon} />
      ) : (
        <FaSun className={styles.icon} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
