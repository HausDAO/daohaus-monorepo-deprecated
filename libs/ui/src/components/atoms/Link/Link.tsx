import React from 'react';
import { RiExternalLinkLine } from 'react-icons/ri';

import { InternalLink, ExternalLink } from './Link.styles';

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
  href: string;
}

// TODO Better way to do types
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props) => {
  const isHrefExternal = props?.href?.match(/^http|^https|^www/);

  if (isHrefExternal) {
    return (
      <ExternalLink
        href={props.href}
        className={props.className}
        target={props.target || '_blank'}
      >
        {props.children}
        <RiExternalLinkLine />
      </ExternalLink>
    );
  }

  return (
    <InternalLink to={props.href || '/'} className={props.className}>
      {props.children}
    </InternalLink>
  );
});
