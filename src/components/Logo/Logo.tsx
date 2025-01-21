import styles from "./Logo.module.scss";
import logoFull from "../../assets/logo_full.svg";
import logoQuick from "../../assets/logo_quick.svg";

interface LogoProps {
  theme: "light" | "dark"; // Тема (светлая или тёмная)
}

const Logo = ({ theme }: LogoProps) => {
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
