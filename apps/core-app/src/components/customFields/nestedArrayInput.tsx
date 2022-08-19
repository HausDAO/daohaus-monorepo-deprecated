import { Buildable, WrappedInput, Field } from '@daohaus/ui';
import React from 'react';
import { RegisterOptions } from 'react-hook-form';

export const NestedArray = (props: Buildable<Field>) => {
  const newRules: RegisterOptions = {
    ...props.rules,
    setValueAs: (val) => [val],
    // validate: (val) => props?.rules?.validate? props.rules?.validate(val[0]) : true,
  };
  return <WrappedInput {...props} rules={newRules} />;
};
