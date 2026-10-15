import type { FieldConfig } from "../config/leadFormConfig";

export type FormValue = string | boolean;
export type FormValues = Record<string, FormValue>;
export type FormErrors = Record<string, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getVisibleFields(
  config: FieldConfig[],
  values: FormValues,
): FieldConfig[] {
  return config.filter((field) => {
    if (!field.showWhen) return true;
    return values[field.showWhen.field] === field.showWhen.equals;
  });
}

/** Pure validation: the same config + values always produces the same errors. */
export function validateForm(
  config: FieldConfig[],
  values: FormValues,
): FormErrors {
  const errors: FormErrors = {};

  for (const field of getVisibleFields(config, values)) {
    const value = values[field.name];
    const text = typeof value === "string" ? value.trim() : "";
    const isEmpty = field.type === "checkbox" ? value !== true : text.length === 0;

    if (field.required && isEmpty) {
      errors[field.name] = `${field.label} is required.`;
      continue;
    }

    if (isEmpty) continue;

    if (field.type === "email" && !EMAIL_PATTERN.test(text)) {
      errors[field.name] = "Enter a valid email address.";
      continue;
    }

    if (field.pattern && !new RegExp(field.pattern).test(text)) {
      errors[field.name] = "Enter a valid 10-digit phone number.";
      continue;
    }

    if (field.maxLength !== undefined && text.length > field.maxLength) {
      errors[field.name] = `Use ${field.maxLength} characters or fewer.`;
    }
  }

  return errors;
}