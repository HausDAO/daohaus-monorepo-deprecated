import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { StyledNavLink } from './SubNavLink.styles';

export const SubNavLink = ({
  selected,
  children,
  as,
  ...props
}: {
  as?: string;
  selected?: boolean;
  children: ReactNode;
} & React.ComponentPropsWithRef<'a'>) => {
  const classes = classNames({ selected });

  return (
    <StyledNavLink className={classes} {...props}>
      {children}
    </StyledNavLink>
  );
};
