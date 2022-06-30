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

/*
 * TODO Finish Card once design is completed
 * Github Issue 258 (Pending Design).
 */
export const Card = React.forwardRef(
  ({ className, children }: CardProps, ref: Ref) => {
    return <BaseCard className={className}>{children}</BaseCard>;
  }
);
