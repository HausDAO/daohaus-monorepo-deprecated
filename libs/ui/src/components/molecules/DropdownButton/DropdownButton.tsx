import React from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons';

import { RiArrowDropDownLine } from 'react-icons/ri';
import { ButtonV2 } from '../../atoms/ButtonV2';
import { ProfileAvatar } from '../ProfileAvatar';

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
  theme: 'primary' | 'secondary';
  /* Size of the button */
  size: 'sm' | 'md' | 'lg';
  /** Controls button variant */
  variant: 'solid' | 'outline' | 'link';
  /* Width of the button element */
  width: 'fit-content' | '100%' | string;
  /* React node */
  children?: React.ReactNode;
  /* Css class name */
  className?: string;
  /* On Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /* Adds Profile Avatar to the left of children */
  profileAvatar?: React.ReactNode;
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
    theme = 'primary',
    variant = 'solid',
    size = 'md',
    width = 'fit-content',
    ...rest
  } = props;

  const classes = classNames({
    [variant]: variant,
    [size]: size,
  });

  return (
    <ButtonV2
      {...rest}
      theme={theme}
      width={width}
      size={size}
      variant={variant}
      className={`${classes} ${className}`}
      ref={ref}
      IconRight={IconRight}
    >
      {children}
    </ButtonV2>
  );
});
