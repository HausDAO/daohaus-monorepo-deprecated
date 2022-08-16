import React, { JSXElementConstructor, RefObject } from 'react';
import classNames from 'classnames';
import { IconType, IconBaseProps } from 'react-icons';

import { ButtonBase } from './Button.styles';

export type ButtonProps = {
  avatar?: boolean;
  centerAlign?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  IconLeft?:
    | IconType
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
        }
      >;
  IconRight?:
    | IconType
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
        }
      >;
  leftAlign?: boolean;
  lg?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  secondary?: boolean;
  sm?: boolean;
  tertiary?: boolean;
  type?: 'button' | 'submit' | 'reset';
  value?: string;
  width?: string;
};

type Ref =
  | ((instance: HTMLButtonElement | null) => void)
  | RefObject<HTMLButtonElement>
  | null
  | undefined;

export const Button = React.forwardRef((props: ButtonProps, ref: Ref) => {
  const {
    secondary,
    sm,
    lg,
    tertiary,
    children,
    fullWidth,
    centerAlign,
    leftAlign,
    avatar,
    className,
    IconLeft,
    IconRight,
    type,
    value,
  } = props;
  const classes = classNames({
    secondary,
    sm,
    lg,
    tertiary,
    avatar,
    'left-align': leftAlign,
    'full-width': fullWidth,
    'center-align': centerAlign,
  });

  const iconClasses = classNames({ secondary, tertiary, sm, lg });
  return (
    <ButtonBase
      {...props}
      className={`${classes} ${className}`}
      ref={ref}
      type={type}
      value={value}
    >
      {IconLeft && <IconLeft className={`${iconClasses} icon-left`} />}
      {children}
      {IconRight && <IconRight className={`${iconClasses} icon-right`} />}
    </ButtonBase>
  );
});
