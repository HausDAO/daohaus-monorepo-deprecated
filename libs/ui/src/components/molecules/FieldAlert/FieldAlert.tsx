import { orangeDark } from '@radix-ui/colors';
import { forwardRef, RefObject } from 'react';
import styled from 'styled-components';
import { Button } from '../../atoms/Button';
import { ParXs } from '../../atoms/Typography';

import { FieldAlertWrapper } from './FieldAlert.styles';

export type FieldAlertProps = {
  className?: string;
  message: string;
};

type Ref =
  | ((instance: HTMLBaseElement | null) => void)
  | RefObject<HTMLBaseElement>
  | null
  | undefined;

export const FieldAlert: React.FC<FieldAlertProps> = forwardRef(
  ({ className, message, children }, ref: Ref) => {
    return (
      <FieldAlertWrapper className={className}>
        <ParXs>{message}</ParXs>
        {children}
      </FieldAlertWrapper>
    );
  }
);
