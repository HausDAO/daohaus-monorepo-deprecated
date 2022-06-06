import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldWrapper } from '../FieldWrapper';
import { InputSelect } from '../InputSelect';
import { InputSelectProps } from '../../../types/formAndField';

export const WrappedInputSelect = (props: InputSelectProps) => {
  const { id, selectId } = props;
  const { register } = useFormContext();
  return (
    <FieldWrapper {...props}>
      <InputSelect
        {...props}
        registerInput={register(id)}
        registerSelect={register(selectId)}
      />
    </FieldWrapper>
  );
};
