import React from 'react';
import { RiExternalLinkLine } from 'react-icons/ri';

import { InternalLink, ExternalLink } from './Link.styles';

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
  href: string;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props) => {
  const isHrefExternal = props.href.match(/^http|^https|^www/);

  if (isHrefExternal) {
    return (
      <ExternalLink href={props.href} target="_blank">
        {props.children}
        <RiExternalLinkLine />
      </ExternalLink>
    );
  }

  return <InternalLink to={props.href}>{props.children}</InternalLink>;
});
