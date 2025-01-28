import { useThemeStore } from "../../store/theme";
import styles from "./Logo.module.scss";
import logoFull from "../../assets/logo_full.svg";
import logoQuick from "../../assets/logo_quick.svg";

const Logo = () => {
  const { theme } = useThemeStore();

  return (
    <div className={styles.logo}>
      <img src={logoQuick} alt="<IF />" className={styles.logoQuick} />

      <img
        src={logoFull}
        alt="<InterviewForce />"
        className={styles.logoFull}
        style={{
          filter: theme === "dark" ? "invert(1)" : "invert(0)",
        }}
      />
    </div>
  );
};

export default Logo;
