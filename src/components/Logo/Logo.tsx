import { useThemeStore } from "../../store/theme";
import styles from "./Logo.module.scss";
import logoFull from "../../assets/logo_full.svg";
import logoQuick from "../../assets/logo_quick.svg";

const Logo = () => {
  const { theme } = useThemeStore(); // Получаем текущую тему

  return (
    <div className={styles.logo}>
      {/* Для мобильных устройств - короткий логотип */}
      <img src={logoQuick} alt="<IF />" className={styles.logoQuick} />
      {/* Для десктопов - полный логотип */}
      <img
        src={logoFull}
        alt="<InterviewForce />"
        className={styles.logoFull}
        style={{
          filter: theme === "dark" ? "invert(1)" : "invert(0)", // Инвертируем цвета для темной темы
        }}
      />
    </div>
  );
};

export default Logo;
