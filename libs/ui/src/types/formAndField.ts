type ErrorMessage = {
  type: 'error';
  message: string;
};
type WarningMessage = {
  type: 'warning';
  message: string;
};
type SuccessMessage = {
  type: 'success';
  message: string;
};
export type Field = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  info?: string;
  disabled?: true;
  warning?: WarningMessage;
  error?: ErrorMessage;
  success?: SuccessMessage;
  // successText?: string;
  // errorText?: string;
  // warningText?: string;
};
