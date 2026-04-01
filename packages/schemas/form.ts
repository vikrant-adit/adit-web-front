// packages/schemas/form.ts

export type FormId = string;

/* ----------------------------------
 * Field Types
 * ---------------------------------- */

export type BaseField = {
  id: string;               // unique per form
  name: string;             // payload key
  label: string;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
};

export type TextField = BaseField & {
  type: 'text' | 'email' | 'tel';
  minLength?: number;
  maxLength?: number;
};

export type SelectField = BaseField & {
  type: 'select';
  options: { label: string; value: string }[];
};

export type CheckboxField = BaseField & {
  type: 'checkbox';
};

export type Field =
  | TextField
  | SelectField
  | CheckboxField;

/* ----------------------------------
 * Layout & UI Hints (no HTML)
 * ---------------------------------- */

export type FormLayout =
  | "single-column"
  | "two-column"
  | "three-column"
  | "split-left-promo";

export type FieldUI = {
  colSpan?: 1 | 2; // for grid layouts
};

/* ----------------------------------
 * Submit & Confirmation
 * ---------------------------------- */

export type SubmitConfig = {
  endpoint: string;   // e.g. /api/leads
  method: 'POST';
};

export type ConfirmationConfig = {
  successMessage: string;
  errorMessage: string;
  redirectUrl?: string;
};

/* ----------------------------------
 * Main Form Schema
 * ---------------------------------- */

export type FormSchema = {
  id: FormId;
  name: string;
  description?: string;

  layout: FormLayout;

  fields: (Field & { ui?: FieldUI })[];

  submit: SubmitConfig;

  confirmation: ConfirmationConfig;
};
