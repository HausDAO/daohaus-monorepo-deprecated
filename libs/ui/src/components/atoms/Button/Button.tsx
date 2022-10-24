import React from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons';

import { ButtonBase } from './Button.styles';

export type ButtonColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // ! Not Included untill talk with design
  // Shows loading spinner */
  loading?: boolean;
  // ! Not Included untill talk with design
  /* The label to show in the button when loading is true */
  loadingText?: string;
  /** Set theme color */
  colorVariant?: ButtonColorVariant;
  /* Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Controls button variant */
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  /* Width of the button element */
  fullWidth?: boolean;
  /* Adds icon before button label */
  IconLeft?: IconType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  /* Adds icon after button label */
  IconRight?: IconType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      type = 'button',
      IconLeft,
      IconRight,
      colorVariant = 'primary',
      variant = 'solid',
      size = 'md',
      fullWidth,
      className,
      children,
      ...rest
    } = props;

    const classes = classNames({
      [variant]: variant,
      [size]: size,
      'full-width': fullWidth,
    });

    return (
      <ButtonBase
        {...rest}
        colorVariant={colorVariant}
        className={`${classes} ${className}`}
        ref={ref}
        type={type}
      >
        {IconLeft && <IconLeft className="icon-left" />}
        {children}
        {IconRight && <IconRight className="icon-right" />}
      </ButtonBase>
    );
  }
);
