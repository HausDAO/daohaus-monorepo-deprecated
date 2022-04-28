import React, { RefObject } from 'react';
import { ButtonBase } from './buttonStyles';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  secondary?: boolean;
  sm?: boolean;
  lg?: boolean;
  tertiary?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type Ref =
  | ((instance: HTMLButtonElement | null) => void)
  | RefObject<HTMLButtonElement>
  | null
  | undefined;

const Button = React.forwardRef((props: ButtonProps, ref: Ref) => {
  const { secondary, sm, lg, tertiary, children } = props;
  const classes = classNames({ secondary, sm, lg, tertiary });
  return (
    <ButtonBase {...props} className={classes} ref={ref}>
      {children}
    </ButtonBase>
  );
});
export default Button;
