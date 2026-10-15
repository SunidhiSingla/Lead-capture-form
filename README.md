# Dynamic Lead Form

A responsive lead-capture form built with React, TypeScript, Vite, and plain CSS. It uses a typed configuration array, reusable design-system atoms, a field molecule, and a pure validation function. No component library or backend is used.

## Install and run

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

Check the production build with:

```bash
npm run build
npm run preview
```

## Folder layout

```text
src/
├── design-system/
│   ├── tokens/tokens.css       # Color, spacing, typography, breakpoints
│   ├── atoms/                  # TextInput, Select, Checkbox, Button
│   └── molecules/              # Field: label + control + hint + error
├── features/
│   └── lead/
│       ├── config/             # Typed lead field configuration
│       ├── validation/         # Pure validation function
│       ├── LeadForm.tsx        # Config-driven rendering and form state
│       └── LeadPage.tsx        # Page composition
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

## Where to make changes

- **Tokens:** `src/design-system/tokens/tokens.css`
- **Atoms:** `src/design-system/atoms/`
- **Field molecule:** `src/design-system/molecules/Field.tsx` and `Field.module.css`
- **Field config:** `src/features/lead/config/leadFormConfig.ts`
- **Validation rules:** `src/features/lead/validation/validateForm.ts`
- **Form behavior:** `src/features/lead/LeadForm.tsx`
- **Page layout and desktop/mobile styling:** `src/features/lead/LeadPage.tsx` and `src/features/lead/LeadForm.module.css`

## Behavior

- Fields render from the typed config, not from field-by-field JSX.
- Company name appears only for the Company lead type.
- Validation runs on blur and submit; errors are shown beside their fields.
- Invalid submissions are blocked. A valid submission is displayed on the page and logged to the console.
- Desktop uses two columns above 1024px. Tablet and mobile use one column.
- On mobile, the submit action is sticky at the bottom with safe space reserved so it does not cover content.
- Notes are optional and limited to 200 characters.
