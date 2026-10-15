import type { InputHTMLAttributes } from "react";
import styles from "./atoms.module.css";

type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "name" | "checked" | "onChange" | "type"
> & {
  id: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
};

export default function Checkbox({
  id,
  name,
  checked,
  onChange,
  error = false,
  ...props
}: CheckboxProps) {
  return (
    <input
      className={`${styles.checkbox} ${error ? styles.checkboxInvalid : ""}`}
      id={id}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.currentTarget.checked)}
      aria-invalid={error}
      {...props}
    />
  );
}