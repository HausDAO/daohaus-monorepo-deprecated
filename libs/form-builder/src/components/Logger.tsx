import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';

export const Logger = ({ log }: { log: boolean }) => {
  const formValues = useWatch();
  useEffect(() => {
    if (log && formValues) {
      console.log('formValues', formValues);
    }
  }, [formValues, log]);

  return null;
};
