import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeSwitcher = () => {
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const isDarkTheme =
    document.documentElement.getAttribute("data-theme") === "dark";

  return (
    <button
      onClick={toggleTheme}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "43px",
        height: "43px",
        background: "var(--color-primary)",
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        transition: "background-color 0.3s",
        color: "#fff",
        boxShadow: "var(--box-shadow)",
      }}
    >
      {isDarkTheme ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default ThemeSwitcher;
