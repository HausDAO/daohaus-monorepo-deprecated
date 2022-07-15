import React from 'react';
import { RiExternalLinkLine } from 'react-icons/ri';

import { InternalLink, ExternalLink } from './Link.styles';

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
  href?: string;
  externalIcon?: boolean;
}

// TODO Better way to do types
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { externalIcon = true, children, href = '/', target = '_blank', className },
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
          {externalIcon && <RiExternalLinkLine />}
        </ExternalLink>
      );
    }

    return (
      <InternalLink to={href} className={className} ref={ref}>
        {children}
      </InternalLink>
    );
  }
);
