import type { ReactNode } from "react";
import styles from "./Field.module.css";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  fullWidth?: boolean;
  controlBeforeLabel?: boolean;
  children: ReactNode;
}

export default function Field({
  id,
  label,
  required = false,
  hint,
  error,
  fullWidth = false,
  controlBeforeLabel = false,
  children,
}: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [hintId, error ? errorId : undefined].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`${styles.field} ${fullWidth ? styles.fullWidth : ""}`}>
      {controlBeforeLabel ? (
        <div className={styles.checkboxRow}>
          {children}
          <label className={styles.checkboxLabel} htmlFor={id}>
            {label}
            {required && <span className={styles.required}> *</span>}
          </label>
        </div>
      ) : (
        <>
          <label className={styles.label} htmlFor={id}>
            {label}
            {required && <span className={styles.required}> *</span>}
          </label>
          {children}
        </>
      )}
      {hint && <p className={styles.hint} id={hintId}>{hint}</p>}
      {error && <p className={styles.error} id={errorId} role="alert">{error}</p>}
      {/*
        The form passes aria-describedby to each atom so the control is
        programmatically associated with this hint/error text.
      */}
      <span hidden>{describedBy}</span>
    </div>
  );
}