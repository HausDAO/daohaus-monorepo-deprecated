import React, { ReactNode } from 'react';
import { Card } from '../../atoms/Card';

import { BaseCard } from './VotingCard.styles';

export type VotingCardProps = {
  children: ReactNode;
  className?: string;
  success?: boolean;
  warning?: boolean;
  error?: boolean;
  width?: string;
};

export const VotingCard = ({
  className,
  width = 'fit-content',
  children,
}: VotingCardProps) => {
  return (
    <Card className={className} width={width}>
      {children}
    </Card>
  );
};
