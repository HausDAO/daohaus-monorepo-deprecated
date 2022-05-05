import React, { RefObject } from 'react';
import { ButtonBase, WithIcon } from './buttonStyles';
import classNames from 'classnames';
import { IconType } from 'react-icons';

export type ButtonProps = {
  children: React.ReactNode;
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
};

type Ref =
  | ((instance: HTMLButtonElement | null) => void)
  | RefObject<HTMLButtonElement>
  | null
  | undefined;

const Button = React.forwardRef((props: ButtonProps, ref: Ref) => {
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
  console.log('avatar', avatar);
  console.log('classes', classes);
  if (icon) {
    const Icon = icon;
    const iconClasses = classNames({ secondary, tertiary });
    return (
      <ButtonBase {...props} className={classes} ref={ref}>
        <WithIcon>
          <Icon size="2.1rem" className={iconClasses} />
          {children}
        </WithIcon>
      </ButtonBase>
    );
  }
  return (
    <ButtonBase {...props} className={classes} ref={ref}>
      {children}
    </ButtonBase>
  );
});
export default Button;
