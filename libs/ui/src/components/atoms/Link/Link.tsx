import React from 'react';
import { IconType } from 'react-icons';
import { RiExternalLinkLine } from 'react-icons/ri';

import { InternalLink, ExternalLink } from './Link.styles';

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
  href?: string;
  Icon?: IconType;
  isExternal?: boolean;
}

// TODO Better way to do types
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      isExternal = false,
      Icon,
      children,
      href = '/',
      target = '_blank',
      className,
    },
    ref
  ) => {
    const isHrefExternal = href?.match(/^http|^https|^www/);

    if (isHrefExternal) {
      return (
        <ExternalLink
          href={href}
          className={className}
          target={target}
          ref={ref}
        >
          {children}
          {isExternal && Icon ? <Icon /> : <RiExternalLinkLine />}
        </ExternalLink>
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
