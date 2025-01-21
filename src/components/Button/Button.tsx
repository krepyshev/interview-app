import React from "react";
import "./Button.css";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outlined";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`button button--${variant} ${disabled ? "button--disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
