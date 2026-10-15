import type { TextareaHTMLAttributes } from "react";
import styles from "./atoms.module.css";

type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "name" | "value" | "onChange"
> & {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
};

export default function Textarea({
  id,
  name,
  value,
  onChange,
  error = false,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={`${styles.control} ${styles.textarea} ${error ? styles.invalid : ""}`}
      id={id}
      name={name}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      aria-invalid={error}
      {...props}
    />
  );
}
