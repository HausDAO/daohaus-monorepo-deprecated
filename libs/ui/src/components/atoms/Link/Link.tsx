import React from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons';
import { RiExternalLinkLine } from 'react-icons/ri';

import { InternalLink, ExternalLink, NavLink } from './Link.styles';

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
  href?: string;
  Icon?: IconType;
  isExternal?: boolean;
  selected?: boolean;
  disabled?: boolean;
  linkType?: 'internal' | 'external' | 'navigation';
}

// TODO Better way to do types
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href = '/',
      target = '_blank',
      linkType = 'internal',
      selected,
      disabled = false,
      Icon,
      className,
      children,
    },
    ref
  ) => {
    if (linkType === 'external') {
      return (
        <ExternalLink
          href={href}
          className={className}
          target={target}
          ref={ref}
        >
          {children}
          {linkType === 'external' && Icon ? <Icon /> : <RiExternalLinkLine />}
        </ExternalLink>
      );
    }

    if (linkType === 'navigation') {
      const classes = classNames({ selected });
      return (
        <NavLink to={href} className={`${classes} ${className}`} ref={ref}>
          {children}
          {Icon && <Icon />}
        </NavLink>
      );
    }

    return (
      <InternalLink to={href} className={className} ref={ref}>
        {children}
        {Icon && <Icon />}
      </InternalLink>
    );
  }
);
