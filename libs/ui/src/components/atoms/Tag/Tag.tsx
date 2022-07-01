import React, { ReactNode, RefObject } from 'react';

import { BaseTag } from './Tag.styles';

export type TagProps = {
  children: ReactNode;
  tagColor: 'blue' | 'green' | 'pink' | 'violet';
  className?: string;
};

type Ref =
  | ((instance: HTMLBaseElement | null) => void)
  | RefObject<HTMLBaseElement>
  | null
  | undefined;

export const Tag = React.forwardRef(
  ({ className, children, tagColor }: TagProps, ref: Ref) => {
    return (
      <BaseTag tagColor={tagColor || 'green'} className={className}>
        {children}
      </BaseTag>
    );
  }
);
