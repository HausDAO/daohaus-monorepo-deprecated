import React from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons';
import { RiExternalLinkLine } from 'react-icons/ri';

import { InternalLink, ExternalLink } from './Link.styles';

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
  href?: string;
  Icon?: IconType;
  selected?: boolean;
  disabled?: boolean;
  linkType?: 'internal' | 'external';
  hideIcon?: boolean;
  // iconPosition:
}

// TODO Better way to do types
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href = '/',
      target = '_blank',
      linkType = 'internal',
      selected,
      disabled,
      Icon,
      className,
      children,
    },
    ref
  ) => {
    const classes = classNames({ selected, disabled });
    if (linkType === 'external') {
      return (
        <ExternalLink
          href={href}
          className={`${classes} ${className}`}
          target={target}
          ref={ref}
        >
          {children}
          {Icon ? <Icon /> : <RiExternalLinkLine />}
        </ExternalLink>
      );
    }
    return (
      <InternalLink to={href} className={`${classes} ${className}`} ref={ref}>
        {children}
        {Icon && <Icon />}
      </InternalLink>
    );
  }
);
