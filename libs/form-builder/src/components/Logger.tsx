import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export const Logger = () => {
  const { control } = useFormContext();
  const formValues = useWatch({ control });

  useEffect(() => {
    if (formValues) {
      console.log('formValues', formValues);
    }
  }, [formValues]);

  return null;
};
