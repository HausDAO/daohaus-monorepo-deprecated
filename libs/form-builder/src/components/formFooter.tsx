import { Button } from '@daohaus/ui';
import React from 'react';

export const FormFooter = ({
  submitDisabled,
  submitButtonText,
}: {
  submitDisabled?: boolean;
  submitButtonText?: string;
}) => {
  /*Form Alert Component goes here*/
  return (
    <Button fullWidth lg centerAlign type="submit" disabled={submitDisabled}>
      {submitButtonText || 'Submit'}
    </Button>
  );
};
