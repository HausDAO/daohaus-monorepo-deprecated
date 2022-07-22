import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons';

import { StyledNavLink } from './NavLink.styles';

export const NavLink = ({
  selected,
  children,
  Icon,
  ...props
}: {
  selected?: boolean;
  Icon?: IconType;
  children: ReactNode;
} & React.ComponentPropsWithRef<'a'>) => {
  const classes = classNames({ selected });

  return (
    <StyledNavLink className={classes} {...props}>
      {children}
      {Icon && <Icon />}
    </StyledNavLink>
  );
};
