import { ReactNode, RefObject, forwardRef } from 'react';

import { Bold, ParMd, ParXs } from '../Typography';

import { BaseBadge } from './Badge.styles';

export type BadgeProps = {
  badgeLabel: ReactNode;
  badgeSize: 'sm' | 'lg';
  badgeColor: 'blue' | 'green' | 'pink' | 'violet';
  className?: string;
};

type Ref =
  | ((instance: HTMLBaseElement | null) => void)
  | RefObject<HTMLBaseElement>
  | null
  | undefined;

export const Badge = forwardRef(
  (
    {
      className,
      badgeLabel,
      badgeSize = 'sm',
      badgeColor = 'blue',
    }: BadgeProps,
    ref: Ref
  ) => {
    return (
      <BaseBadge
        badgeColor={badgeColor || 'blue'}
        badgeSize={badgeSize || 'sm'}
        className={className}
      >
        {badgeSize === 'sm' && (
          <ParXs>
            <Bold>{badgeLabel}</Bold>
          </ParXs>
        )}
        {badgeSize === 'lg' && (
          <ParMd>
            <Bold>{badgeLabel}</Bold>
          </ParMd>
        )}
      </BaseBadge>
    );
  }
);
