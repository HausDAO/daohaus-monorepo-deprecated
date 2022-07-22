import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { RadioGroupProps } from '@radix-ui/react-radio-group';

import type { PrimitiveWrapper } from '../../../types/formAndField';
import { Radio, Props } from '../../atoms/Radio';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';
import { useMemo } from 'react';

type RadioGroupComponentProps = RadioGroupProps & Props;
type RadioGroupWrapperProps = PrimitiveWrapper & {
  disabled?: boolean;
  registerOptions?: RegisterOptions;
  radioGroup: RadioGroupComponentProps;
};

export const WrappedRadio = (props: RadioGroupWrapperProps) => {
  const {
    id,
    helperText,
    info,
    label,
    error,
    success,
    warning,
    radioGroup,
    disabled,
  } = props;
  const { control } = useFormContext();

  const disableAll = disabled;
  const radios = useMemo(() => {
    return disableAll
      ? radioGroup?.radios.map((radio) => ({ ...radio, disabled: true }))
      : radioGroup.radios;
  }, [radioGroup, disableAll]);

  return (
    <FieldWrapper
      id={id}
      helperText={helperText}
      info={info}
      label={label}
      error={error}
      success={success}
      warning={warning}
    >
      <Controller
        name={radioGroup.name || id}
        control={control}
        defaultValue={radioGroup.defaultValue}
        render={({ field }) => {
          return (
            <Radio
              onValueChange={field.onChange}
              radios={radios}
              ref={field.ref}
            />
          );
        }}
      />
    </FieldWrapper>
  );
};
