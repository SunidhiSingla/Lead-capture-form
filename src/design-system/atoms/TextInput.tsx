import type { InputHTMLAttributes } from "react";
import styles from "./atoms.module.css";

type TextInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "name" | "value" | "onChange" | "type"
> & {
  id: string;
  name: string;
  type?: "text" | "email";
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
};

export default function TextInput({
  id,
  name,
  type = "text",
  value,
  onChange,
  error = false,
  ...props
}: TextInputProps) {
  return (
    <input
      className={`${styles.control} ${error ? styles.invalid : ""}`}
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      aria-invalid={error}
      {...props}
    />
  );
}