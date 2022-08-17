import React, { ChangeEventHandler } from 'react';
import { SwitchProps } from '@radix-ui/react-switch';
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
  label?: string;
  helperText?: string;
  info?: string;
};

export type PrimitiveElement = {
  id: string;
  warning?: WarningMessage;
  error?: ErrorMessage;
  success?: SuccessMessage;
  className?: string;
  disabled?: boolean;
};

export type PrimitiveSizable = {
  long?: boolean;
  address?: boolean;
  full?: boolean;
};

export type PrimitiveAddons = {
  rightAddon?: React.ReactNode;
};

export type HasRules = {
  rules?: RegisterOptions;
};

type FieldWrapper = PrimitiveWrapper &
  PrimitiveElement &
  PrimitiveSizable &
  PrimitiveAddons;

export type Buildable<T> = T & FieldWrapper & HasRules;

export type Field = {
  placeholder?: string;
  disabledPlaceholder?: boolean;
  defaultValue?: string;
  number?: boolean;
  address?: boolean;
  long?: boolean;
  full?: boolean;
} & PrimitiveElement;

// & PrimitiveWrapper &
//   HasRules;

// TODO Refine based on Radix Checkbox Type & Wrapper
// export type CheckboxWrapperProps = {
//   checkboxes: CheckboxProps[];
// } & PrimitiveWrapper &
//   HasRules;

export type OptionType = {
  name: string;
  value: string | number;
  key?: string;
};
export type SelectProps = {
  defaultValue?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  options: OptionType[];
  containerClassName?: string;
  long?: boolean;
  full?: boolean;
  placeholder?: string;
} & PrimitiveElement & PrimitiveWrapper;

export type InputSelectProps = Field &
  SelectProps & { selectId: string; selectPlaceholder?: string };

export type SwitchComponentProps = SwitchProps & {
  fieldLabel: string;
  id: string;
  className?: string;
  disabled?: boolean;
};
  
export type Switchable = { switches: SwitchComponentProps[] };

export type IGatedInput = Field & InputSelectProps & Switchable;

export type FileInputProps = Field & {
  multiple?: boolean;
  accept?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string;
};
