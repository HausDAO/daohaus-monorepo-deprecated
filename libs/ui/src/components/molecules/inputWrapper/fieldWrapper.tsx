import classNames from 'classnames';
import React from 'react';
import { Field } from '../../../types/formAndField';
import { HelperTextFactory } from '../../atoms/helperTexts';
import InputLabel from '../../atoms/inputLabel/inputLabel';
import { FieldWrapperBase } from './fieldWrapperStyles';

type FieldWrapperProps = Field & {
  children: React.ReactNode;
  long?: boolean;
  full?: boolean;
};

const FieldWrapper = ({
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
}: FieldWrapperProps) => {
  const classes = classNames({ long: long || address, full });
  return (
    <FieldWrapperBase className={classes}>
      <InputLabel required={required} info={info}>
        {label}
      </InputLabel>
      <div>{children}</div>
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
