import { Button } from '@daohaus/ui';
import React from 'react';

export const FormFooter = ({ submitDisabled }: { submitDisabled: boolean }) => {
  /*Form Alert Component goes here*/
  return (
    <Button fullWidth lg type="submit" disabled={submitDisabled}>
      Submit
    </Button>
  );
};
