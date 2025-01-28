import { useThemeStore } from "../../store/theme";
import styles from "./ThemeSwitcher.module.scss";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore();

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
