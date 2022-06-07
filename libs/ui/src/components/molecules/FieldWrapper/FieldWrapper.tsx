import React from 'react';
import classNames from 'classnames';
import { RiAsterisk } from 'react-icons/ri';

import { Label } from '../../atoms/Label';
import { Tooltip } from '../../atoms/Tooltip';
import { Icon } from '../../atoms/Icon';
import {
  ErrorText,
  HelperText,
  SuccessText,
  WarningText,
} from '../../atoms/HelperTexts';
import {
  FieldWrapperBase,
  LabelContainer,
  RequiredAsterisk,
} from './FieldWrapper.styles';
import { Field } from '../../../types/formAndField';
import {
  ErrorMessage,
  WarningMessage,
  SuccessMessage,
} from '../../../types/formAndField';
import { useForm, useFormContext } from 'react-hook-form';

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
  const {
    formState: { errors },
  } = useFormContext();
  const contextError = errors[id];
  return (
    <FieldWrapperBase className={classes}>
      <LabelContainer>
        {required && (
          <RequiredAsterisk>
            <Icon label="Required">
              <RiAsterisk />
            </Icon>
          </RequiredAsterisk>
        )}
        {label && <Label id={id}>{label}</Label>}
        {info && <Tooltip content={info} />}
      </LabelContainer>
      <div className="field-slot">{children}</div>
      <HelperTextFactory
        error={contextError || error}
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
