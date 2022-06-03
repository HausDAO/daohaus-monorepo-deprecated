import { Controller, useFormContext } from 'react-hook-form';
import { RadioGroupProps } from '@radix-ui/react-radio-group';

import type { PrimitiveWrapper } from '../../../types/formAndField';
import { Radio, Props } from '../../atoms/Radio';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

type RadioGroupComponentProps = RadioGroupProps & Props;
type RadioGroupWrapperProps = PrimitiveWrapper & {
  radioGroup: RadioGroupComponentProps;
};

export const WrappedRadio = (props: RadioGroupWrapperProps) => {
  const { id, helperText, info, label, error, success, warning, radioGroup } =
    props;
  const { control } = useFormContext();
  // Watches the values of the form element

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
              {...radioGroup}
              ref={field.ref}
            />
          );
        }}
      />
    </FieldWrapper>
  );
};
