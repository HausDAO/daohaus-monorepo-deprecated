import { CheckboxProps } from '@radix-ui/react-checkbox';

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

export type Wrapper = {
  id: string;
  label: string;
  type?: string;
  helperText?: string;
  info?: string;
  required?: boolean;
  warning?: WarningMessage;
  error?: ErrorMessage;
  success?: SuccessMessage;
};

export type Field = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
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
export type CheckboxWrapperProps = Wrapper & {
  checkboxes: CheckboxProps[];
};
