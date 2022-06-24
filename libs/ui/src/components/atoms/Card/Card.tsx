import React, { ReactNode, RefObject } from 'react';
import classNames from 'classnames';

import { BaseCard } from './Card.styles';

export type CardProps = {
  children: ReactNode;
  className?: string;
  success?: boolean;
  warning?: boolean;
  error?: boolean;
};

type Ref =
  | ((instance: HTMLBaseElement | null) => void)
  | RefObject<HTMLBaseElement>
  | null
  | undefined;

export const Card = React.forwardRef(
  ({ success, warning, error, className, children }: CardProps, ref: Ref) => {
    const cardClasses = classNames({ success, warning, error });
    return (
      <BaseCard className={`${cardClasses} ${className}`}>{children}</BaseCard>
    );
  }
);
