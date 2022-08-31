import React from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons';

import { RiArrowDropDownLine } from 'react-icons/ri';
import { ButtonColorVariant } from '../../atoms/ButtonV2';
import { Avatar, AvatarProps } from '../../atoms';
import { DropdownButtonBase } from './DropdownButton.styles';

export interface DropdownButtonProps {
  /* Makes button disabled */
  disabled?: boolean;
  // ! Not Included untill talk with design
  // Shows loading spinner */
  loading: boolean;
  // ! Not Included untill talk with design
  /* The label to show in the button when loading is true */
  loadingText?: string;
  /** Set theme color */
  colorVariant: ButtonColorVariant;
  /* Size of the button */
  size: 'sm' | 'md' | 'lg';
  /** Controls button variant */
  variant: 'solid' | 'outline' | 'link';
  /* Width of the button element */
  width: 'fit-content' | '100%' | string;
  /* Profile Avatar stils on the left of button */
  profile: Omit<AvatarProps, 'size'>;
  /* React node */
  children?: React.ReactNode;
  /* Css class name */
  className?: string;
  /* On Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /* Adds icon after button label */
  IconRight?: IconType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const DropdownButton = React.forwardRef<
  HTMLButtonElement,
  DropdownButtonProps
>((props, ref) => {
  const {
    IconRight = RiArrowDropDownLine,
    children,
    className,
    colorVariant = 'secondary',
    variant = 'solid',
    size = 'md',
    width = 'fit-content',
    profile,
    ...rest
  } = props;

  const classes = classNames({
    [variant]: variant,
    [size]: size,
    profile: true,
  });

  return (
    <DropdownButtonBase
      {...rest}
      colorVariant={colorVariant}
      width={width}
      size={size}
      variant={variant}
      className={`${classes} ${className}`}
      ref={ref}
      IconRight={IconRight}
    >
      {profile && <Avatar {...profile} size={size} />}
      {children}
    </DropdownButtonBase>
  );
});
