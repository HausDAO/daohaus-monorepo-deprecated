import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldWrapper } from '../FieldWrapper';
import { InputSelect } from '../InputSelect';
import { InputSelectProps } from '../../../types/formAndField';

export const WrappedInputSelect = (props: InputSelectProps) => {
  const { id, selectId, registerOptions } = props;
  const { register } = useFormContext();
  const registration = registerOptions
    ? register(id, registerOptions)
    : register(id);

  return (
    <FieldWrapper {...props}>
      <InputSelect
        {...props}
        registerInput={registration}
        registerSelect={register(selectId)}
      />
    </FieldWrapper>
  );
};
