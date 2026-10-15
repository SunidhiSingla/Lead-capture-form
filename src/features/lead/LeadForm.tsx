import { useMemo, useState } from "react";
import type { FocusEvent, FormEvent } from "react";
import Button from "../../design-system/atoms/Button";
import Checkbox from "../../design-system/atoms/Checkbox";
import Select from "../../design-system/atoms/Select";
import Textarea from "../../design-system/atoms/Textarea";
import TextInput from "../../design-system/atoms/TextInput";
import Field from "../../design-system/molecules/Field";
import { leadFormConfig, type FieldConfig } from "./config/leadFormConfig";
import {
  getVisibleFields,
  validateForm,
  type FormErrors,
  type FormValues,
} from "./validation/validateForm";
import styles from "./LeadForm.module.css";

const initialValues: FormValues = Object.fromEntries(
  leadFormConfig.map((field) => [
    field.name,
    field.type === "checkbox" ? false : "",
  ]),
);

function getControlId(name: string) {
  return `lead-${name}`;
}

export default function LeadForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(null);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const visibleFields = useMemo(
    () => getVisibleFields(leadFormConfig, values),
    [values],
  );

  function updateValue(name: string, value: string | boolean) {
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    setSubmittedValues(null);

    // Recompute the complete error map so dependent fields are handled too.
    const nextErrors = validateForm(leadFormConfig, nextValues);
    setErrors((previous) => {
      const visibleNames = new Set(getVisibleFields(leadFormConfig, nextValues).map((field) => field.name));
      const merged: FormErrors = {};
      for (const [key, message] of Object.entries(nextErrors)) {
        if (touched[key] || attemptedSubmit) merged[key] = message;
      }
      // Preserve untouched errors only if the user has already attempted submit.
      if (!attemptedSubmit) {
        for (const [key, message] of Object.entries(previous)) {
          if (visibleNames.has(key) && touched[key]) merged[key] = nextErrors[key] ?? message;
        }
      }
      return merged;
    });
  }

  function handleBlur(field: FieldConfig) {
    return (_event: FocusEvent<HTMLElement>) => {
      setTouched((previous) => ({ ...previous, [field.name]: true }));
      const nextErrors = validateForm(leadFormConfig, values);
      setErrors((previous) => {
        const next = { ...previous };
        if (nextErrors[field.name]) next[field.name] = nextErrors[field.name];
        else delete next[field.name];

        // If a conditional field became hidden, remove its stale error.
        for (const configuredField of leadFormConfig) {
          if (!getVisibleFields(leadFormConfig, values).some((visible) => visible.name === configuredField.name)) {
            delete next[configuredField.name];
          }
        }
        return next;
      });
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttemptedSubmit(true);
    const nextErrors = validateForm(leadFormConfig, values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = visibleFields.find((field) => nextErrors[field.name]);
      if (firstInvalid) {
        document.getElementById(getControlId(firstInvalid.name))?.focus();
      }
      return;
    }

    const result: FormValues = {};
    for (const field of visibleFields) result[field.name] = values[field.name];
    setSubmittedValues(result);
  }

  function renderControl(field: FieldConfig) {
    const id = getControlId(field.name);
    const common = {
      id,
      name: field.name,
      onBlur: handleBlur(field),
      error: Boolean(errors[field.name]),
      "aria-describedby": errors[field.name] ? `${id}-error` : undefined,
      "aria-invalid": Boolean(errors[field.name]),
    };

    switch (field.type) {
      case "text":
      case "email":
        return (
          <TextInput
            {...common}
            type={field.type}
            value={String(values[field.name] ?? "")}
            placeholder={field.placeholder}
            autoComplete={
              field.name === "fullName" ? "name" :
              field.name === "email" ? "email" :
              field.name === "phone" ? "tel" : "organization"
            }
            onChange={(value) => updateValue(field.name, value)}
          />
        );

      case "select":
        return (
          <Select
            {...common}
            value={String(values[field.name] ?? "")}
            options={field.options ?? []}
            onChange={(value) => updateValue(field.name, value)}
          />
        );

      case "textarea":
        return (
          <Textarea
            {...common}
            value={String(values[field.name] ?? "")}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            onChange={(value) => updateValue(field.name, value)}
          />
        );

      case "checkbox":
        return (
          <Checkbox
            {...common}
            checked={values[field.name] === true}
            onChange={(checked) => updateValue(field.name, checked)}
          />
        );
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        {visibleFields.map((field) => (
          <Field
            key={field.name}
            id={getControlId(field.name)}
            label={field.label}
            required={field.required}
            hint={field.hint}
            error={errors[field.name]}
            fullWidth={field.fullWidth}
            controlBeforeLabel={field.type === "checkbox"}
          >
            {renderControl(field)}
          </Field>
        ))}
      </div>

      {attemptedSubmit && Object.keys(errors).length > 0 && (
        <p className={styles.formError} role="alert">
          Please review the highlighted fields and try again.
        </p>
      )}

      <div className={styles.actions}>
        <Button type="submit" className={styles.submitButton}>
          Submit enquiry <span aria-hidden="true">→</span>
        </Button>
      </div>

      {submittedValues && (
        <section className={styles.success} aria-live="polite" aria-labelledby="success-title">
          <div className={styles.successIcon} aria-hidden="true">✓</div>
          <div>
            <h2 id="success-title">Thanks — your enquiry is ready.</h2>
            <p>This demo does not send data to a server. Here are the submitted values:</p>
            <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
          </div>
        </section>
      )}
    </form>
  );
}