import { Button, Link } from '@daohaus/ui';
import React, { ComponentProps } from 'react';

type ProfileLinkProps = {
  href?: string;
  to?: string;
  selected?: boolean;
  disabled?: boolean;
  linkType?: 'internal' | 'external' | 'no-icon-external';
  hideIcon?: boolean;
} & Partial<ComponentProps<typeof Button>>;

export const ButtonLink = ({
  href,
  to,
  selected,
  disabled,
  children,
  linkType,
  hideIcon,
  ...buttonProps
}: ProfileLinkProps) => {
  return (
    <Link
      href={href}
      selected={selected}
      disabled={disabled}
      linkType={linkType}
      hideIcon={hideIcon}
    >
      <Button disabled={disabled} {...buttonProps}>
        {children}
      </Button>
    </Link>
  );
};
