import { forwardRef, RefObject } from 'react';
import { ParXs } from '../Typography';

import { FieldAlertWrapper } from './FieldAlert.styles';

export type AlertProps = {
  className?: string;
  message: string;
  action?: React.ReactNode;
};

type Ref =
  | ((instance: HTMLBaseElement | null) => void)
  | RefObject<HTMLBaseElement>
  | null
  | undefined;

export const FieldAlert: React.FC<AlertProps> = forwardRef(
  ({ className, message, action }, ref: Ref) => {
    return (
      <FieldAlertWrapper className={className}>
        <ParXs>{message}</ParXs>
        {action}
      </FieldAlertWrapper>
    );
  }
);
