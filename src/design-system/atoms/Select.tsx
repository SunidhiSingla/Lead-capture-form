import type { SelectHTMLAttributes } from "react";
import styles from "./atoms.module.css";

export interface SelectOption {
  label: string;
  value: string;
}

type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "name" | "value" | "onChange"
> & {
  id: string;
  name: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  error?: boolean;
};

export default function Select({
  id,
  name,
  value,
  options,
  onChange,
  error = false,
  ...props
}: SelectProps) {
  return (
    <select
      className={`${styles.control} ${styles.select} ${error ? styles.invalid : ""}`}
      id={id}
      name={name}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      aria-invalid={error}
      {...props}
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}