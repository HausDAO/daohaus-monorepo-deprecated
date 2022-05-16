export type ErrorMessage = {
  type: 'error';
  message: string;
};
export type WarningMessage = {
  type: 'warning';
  message: string;
};
export type SuccessMessage = {
  type: 'success';
  message: string;
};
export type Field = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  helperText?: string;
  required?: boolean;
  info?: string;
  disabled?: boolean;
  number?: boolean;
  address?: boolean;
  long?: boolean;
  full?: boolean;
  warning?: WarningMessage;
  error?: ErrorMessage;
  success?: SuccessMessage;
};

// TODO Refine based on Radix Checkbox Type & Wrapper
export type CheckboxInput = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  helperText?: string;
  required?: boolean;
  info?: string;
  disabled?: boolean;
  number?: boolean;
  address?: boolean;
  long?: boolean;
  full?: boolean;
  warning?: WarningMessage;
  error?: ErrorMessage;
  success?: SuccessMessage;
};
