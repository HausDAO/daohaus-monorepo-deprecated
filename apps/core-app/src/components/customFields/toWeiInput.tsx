import { toBaseUnits, ValidateField } from '@daohaus/common-utilities';
import { Buildable, Field, WrappedInput } from '@daohaus/ui';
import React from 'react';
import { RegisterOptions } from 'react-hook-form';

export const ToWeiInput = (props: Buildable<Field>) => {
  const newRules: RegisterOptions = {
    ...props.rules,
    setValueAs: (val) => [toBaseUnits(val)],
    validate: (val) => ValidateField.number(val[0]),
  };

  return <WrappedInput {...props} rules={newRules} />;
};
