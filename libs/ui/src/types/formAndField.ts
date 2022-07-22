import { CheckboxProps } from '@radix-ui/react-checkbox';
import { ChangeEventHandler } from 'react';
import { RegisterOptions } from 'react-hook-form';

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

export type PrimitiveWrapper = {
  id: string;
  label?: string;
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
  label?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  info?: string;
  disabled?: boolean;
  disabledPlaceholder?: boolean;
  defaultValue?: string;
  number?: boolean;
  address?: boolean;
  long?: boolean;
  full?: boolean;
  warning?: WarningMessage;
  error?: ErrorMessage;
  success?: SuccessMessage;
  rows?: number;
  cols?: number;
  registerOptions?: RegisterOptions;
};

// TODO Refine based on Radix Checkbox Type & Wrapper
export type CheckboxWrapperProps = PrimitiveWrapper & {
  checkboxes: CheckboxProps[];
  registerOptions?: RegisterOptions;
};
export type OptionType = {
  name: string;
  value: string;
  key?: string;
};
export type SelectProps = Field & {
  defaultValue?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  options: OptionType[];
  containerClassName?: string;
};

export type InputSelectProps = Field &
  SelectProps & { selectId: string; selectPlaceholder?: string };
