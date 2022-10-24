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
type ButtonWidth = 'fit-content' | '100%' | string;

export interface ButtonProps {
  /* Makes button disabled */
  disabled?: boolean;
  // ! Not Included untill talk with design
  // Shows loading spinner */
  loading?: boolean;
  // ! Not Included untill talk with design
  /* The label to show in the button when loading is true */
  loadingText?: string;
  /** Set theme color */
  colorVariant?: ButtonColorVariant;
  /* Set the original html type of button */
  type?: 'button' | 'reset' | 'submit';
  /* Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Controls button variant */
  variant?: 'solid' | 'outline' | 'link';
  /* Width of the button element */
  width?: ButtonWidth;
  /* React node */
  children?: React.ReactNode;
  /* Css class name */
  className?: string;
  /* On Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /* Adds icon before button label */
  IconLeft?:
    | IconType
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
        }
      >;
  /* Adds icon after button label */
  IconRight?:
    | IconType
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
        }
      >;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      type = 'button',
      IconLeft,
      IconRight,
      children,
      className,
      colorVariant = 'primary',
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
      <ButtonBase
        {...rest}
        colorVariant={colorVariant}
        buttonWidth={width}
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
