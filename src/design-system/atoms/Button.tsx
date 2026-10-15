import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./atoms.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${variant === "secondary" ? styles.secondary : ""} ${className}`.trim()}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}