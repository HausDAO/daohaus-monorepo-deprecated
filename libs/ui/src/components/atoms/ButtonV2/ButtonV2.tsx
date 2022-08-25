import React from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons';

import { ButtonBase } from './ButtonV2.styles';

export interface ButtonProps {
  /* Makes button active */
  active?: boolean;
  /** Controls button colors */
  theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  /* Makes button disabled */
  disabled?: boolean;
  /* Shows loading spinner */
  loading?: boolean;
  /* The label to show in the button when loading is true */
  loadingText?: string;
  /* Set the original html type of button */
  type?: 'button' | 'reset' | 'submit';
  /* Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Controls button variant */
  variant: 'solid' | 'outline' | 'link';
  /* Width of the button element */
  width?: 'fit-content' | 'full-width' | string;
  /* React node */
  children?: React.ReactNode;
  /* Css class name */
  className?: string;
  /* On Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /* Adds icon before button label */
  leftIcon?:
    | IconType
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
        }
      >;
  /* Adds icon after button label */
  rightIcon?:
    | IconType
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
        }
      >;
}

export const ButtonV2 = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      disabled,
      loading,
      active,
      loadingText,
      type,
      leftIcon,
      rightIcon,
      children,
      className,
      theme = 'primary',
      variant = 'link',
      size = 'md',
      width = 'full-width',
      ...rest
    } = props;

    const classes = classNames({
      [variant]: variant,
      [size]: size,
    });

    return (
      <ButtonBase
        {...rest}
        color={theme}
        className={`${classes} ${className}`}
        ref={ref}
        type={type}
      >
        {children}
      </ButtonBase>
    );
  }
);
