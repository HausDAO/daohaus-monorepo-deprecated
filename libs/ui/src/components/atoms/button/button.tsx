import React from 'react';
import { ButtonBase } from './buttonStyles';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  secondary: boolean;
  sm: boolean;
  lg: boolean;
  dropdown: boolean;
  icon: boolean;
  outline: boolean;
};

const Button = ({
  secondary,
  sm,
  lg,
  dropdown,
  icon,
  children,
  outline,
}: ButtonProps) => {
  const classes = classNames({ secondary, sm, lg, dropdown, icon, outline });
  return <ButtonBase className={classes}>{children}</ButtonBase>;
};

export default Button;
