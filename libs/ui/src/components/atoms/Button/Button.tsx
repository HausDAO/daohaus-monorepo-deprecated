import React, { RefObject } from 'react';
import { ButtonBase, WithIcon } from './Button.styles';
import classNames from 'classnames';
import { IconType } from 'react-icons';

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  secondary?: boolean;
  sm?: boolean;
  lg?: boolean;
  tertiary?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftAlign?: boolean;
  avatar?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  IconLeft?: IconType;
  IconRight?: IconType;
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
    leftAlign,
    avatar,
    className,
    IconLeft,
    IconRight,
  } = props;
  const classes = classNames({
    secondary,
    sm,
    lg,
    tertiary,
    avatar,
    'left-align': leftAlign,
    'full-width': fullWidth,
  });
  if (IconLeft || IconRight) {
    const iconClasses = classNames({ secondary, tertiary, sm, lg });
    return (
      <ButtonBase {...props} className={`${classes} ${className}`} ref={ref}>
        <WithIcon>
          {IconLeft && <IconLeft className={`${iconClasses} icon-left`} />}
          {children}
          {IconRight && <IconRight className={`${iconClasses} icon-right`} />}
        </WithIcon>
      </ButtonBase>
    );
  }
  return (
    <ButtonBase {...props} className={`${classes} ${className}`} ref={ref}>
      {children}
    </ButtonBase>
  );
});
