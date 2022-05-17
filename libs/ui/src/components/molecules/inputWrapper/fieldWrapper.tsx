import classNames from 'classnames';
import React from 'react';
import { Field, Wrapper } from '../../../types/formAndField';
import { InputLabel } from '../../atoms/inputLabel/inputLabel';
import { FieldWrapperBase } from './fieldWrapperStyles';
import {
  ErrorMessage,
  WarningMessage,
  SuccessMessage,
} from '../../../types/formAndField';
import {
  ErrorText,
  HelperText,
  SuccessText,
  WarningText,
} from '../../atoms/helperTexts';

type FieldWrapperProps = Field & {
  children: React.ReactNode;
};

export type HelperTextFactoryProps = {
  error?: ErrorMessage;
  warning?: WarningMessage;
  success?: SuccessMessage;
  helperText?: string;
};

export const FieldWrapper = ({
  children,
  label,
  required,
  info,
  error,
  success,
  warning,
  helperText,
  long,
  full,
  address,
  id,
}: FieldWrapperProps) => {
  const classes = classNames({ long: long || address, full });
  return (
    <FieldWrapperBase className={classes}>
      <InputLabel required={required} info={info} id={id}>
        {label}
      </InputLabel>
      <div className="field-slot">{children}</div>
      <HelperTextFactory
        error={error}
        success={success}
        warning={warning}
        helperText={helperText}
      />
    </FieldWrapperBase>
  );
};

export default FieldWrapper;

const HelperTextFactory = ({
  error,
  success,
  warning,
  helperText,
}: HelperTextFactoryProps) => {
  if (!error && !success && !warning && !helperText) return null;

  if (error) return <ErrorText>{error.message}</ErrorText>;
  if (warning) return <WarningText>{warning.message}</WarningText>;
  if (success) return <SuccessText>{success.message}</SuccessText>;
  return <HelperText>{helperText}</HelperText>;
};
