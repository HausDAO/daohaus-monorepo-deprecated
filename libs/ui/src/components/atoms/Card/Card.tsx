import React, { ReactNode } from 'react';

import { BaseCard } from './Card.styles';

export type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  return <BaseCard className={className}>{children}</BaseCard>;
};
