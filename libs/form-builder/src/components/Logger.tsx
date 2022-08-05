import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';

export const Logger = () => {
  const formValues = useWatch();
  useEffect(() => {
    if (formValues) {
      console.log('formValues', formValues);
    }
  }, [formValues]);

  return null;
};
