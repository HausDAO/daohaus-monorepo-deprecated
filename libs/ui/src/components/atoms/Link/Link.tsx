import React from 'react';

import { StyledLink } from './Link.styles';

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
  external?: boolean;
}

/*
 * TODO Add Stories for links & some sort of Icon for external links
 * Github Issue 233 (Pending Design).
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const { external, ...rest } = props;
    return (
      <StyledLink
        ref={ref}
        target={external ? '_blank' : undefined}
        {...rest}
        rel={external ? 'noopener noreferer' : undefined}
      />
    );
  }
);
