import React, { ReactNode, RefObject } from 'react';

import { BaseCard } from './Card.styles';

export type CardProps = {
  children: ReactNode;
  className?: string;
  cardType?: 'default' | 'success' | 'warning' | 'error';
};

type Ref =
  | ((instance: HTMLBaseElement | null) => void)
  | RefObject<HTMLBaseElement>
  | null
  | undefined;

export const Card = React.forwardRef(
  ({ cardType = 'default', className, children }: CardProps, ref: Ref) => {
    return (
      <BaseCard cardType={cardType} className={className}>
        {children}
      </BaseCard>
    );
  }
);
