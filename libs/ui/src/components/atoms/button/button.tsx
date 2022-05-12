import React, { RefObject } from 'react';
import { ButtonBase, WithIcon } from './buttonStyles';
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
  icon?: IconType;
  iconPos?: 'left' | 'right';
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
    icon,
    avatar,
    className,
    iconPos,
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

  if (icon) {
    const Icon = icon;
    const iconClasses = classNames({ secondary, tertiary, sm, lg });
    const iconLeft = (
      <>
        {children}
        <Icon className={iconClasses} />
      </>
    );
    const iconRight = (
      <>
        <Icon className={iconClasses} />
        {children}
      </>
    );

    return (
      <ButtonBase {...props} className={`${classes} ${className}`} ref={ref}>
        <WithIcon>{iconPos === 'right' ? iconRight : iconLeft}</WithIcon>
      </ButtonBase>
    );
  }
  return (
    <ButtonBase {...props} className={classes} ref={ref}>
      {children}
    </ButtonBase>
  );
});
