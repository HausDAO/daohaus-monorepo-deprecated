import React, { ComponentProps } from 'react';
import { WrappedInput } from '../WrappedInput';

export const CSInput = (props: ComponentProps<typeof WrappedInput>) => {
  const { rules } = props;

  const newRules = {
    ...rules,
    setValueAs: (value: string) => {
      const newVal = value.trim().split(',').filter(Boolean);
      console.log(newVal);
      return newVal;
    },
  };

  return <WrappedInput {...props} rules={newRules} />;
};
