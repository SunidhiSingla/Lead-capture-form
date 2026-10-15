export type FieldType = "text" | "email" | "select" | "textarea" | "checkbox";

export interface FieldConfig {
  name: string;
  type: FieldType;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  maxLength?: number;
  pattern?: string;
  hint?: string;
  fullWidth?: boolean;
  showWhen?: { field: string; equals: string };
}

export const leadFormConfig: FieldConfig[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full name",
    required: true,
    placeholder: "e.g. Alex Morgan",
    hint: "Enter your first and last name.",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    required: true,
    placeholder: "you@company.com",
  },
  {
    name: "leadType",
    type: "select",
    label: "Lead Type",
    required: true,
    options: [
      { label: "Individual", value: "Individual" },
      { label: "Company", value: "Company" },
    ],
  },
  {
    name: "companyName",
    type: "text",
    label: "Company name",
    required: true,
    placeholder: "Your company name",
    showWhen: { field: "leadType", equals: "Company" },
  },
  {
    name: "phone",
    type: "text",
    label: "Phone number",
    required: true,
    placeholder: "10-digit phone number",
    pattern: "^\\d{10}$",
    hint: "Enter 10 digits, without spaces or country code.",
  },
  {
    name: "notes",
    type: "textarea",
    label: "Notes",
    placeholder: "Share a little about what you are looking for…",
    maxLength: 200,
    fullWidth: true,
    hint: "Optional · Up to 200 characters.",
  },
  {
    name: "consent",
    type: "checkbox",
    label: "I agree to be contacted about my enquiry.",
    required: true,
    fullWidth: true,
  },
];