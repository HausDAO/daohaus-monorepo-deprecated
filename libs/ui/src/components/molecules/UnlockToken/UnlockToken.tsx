import React from 'react';
import { Button } from '../../atoms';

import { FieldAlert } from '../../atoms/FieldAlert';

export type UnlockTokenProps = {
  className?: string;
  handleOnClick: () => void;
  token: string;
};

export const UnlockToken: React.FC<UnlockTokenProps> = ({
  handleOnClick,
  token,
}) => {
  return (
    <FieldAlert
      className="warning"
      message={`You must allow spending of ${token} to submit.`}
      action={<Button onClick={handleOnClick}>Unlock {token}</Button>}
    />
  );
};
