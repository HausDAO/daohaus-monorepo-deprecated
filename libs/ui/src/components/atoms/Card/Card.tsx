import React, { ReactNode, RefObject } from 'react';

import { BaseCard } from './Card.styles';

export type CardProps = {
  children: ReactNode;
  className?: string;
};

type Ref =
  | ((instance: HTMLBaseElement | null) => void)
  | RefObject<HTMLBaseElement>
  | null
  | undefined;

export const Card = React.forwardRef((props: CardProps, ref: Ref) => {
  return <BaseCard className={props.className}>{props.children}</BaseCard>;
});
