import classNames from 'classnames';
import { BaseInput, WithIcon } from './Input.styles';
import { Field } from '../../../types/formAndField';
import { IconType } from 'react-icons';
import React from 'react';

export type InputProps = Field & {
  icon?: IconType;
  // onChange?: React.ChangeEvent<HTMLInputElement>;
  className?: string;
};
type Ref =
  | React.RefObject<HTMLInputElement>
  | ((instance: HTMLInputElement | null) => void)
  | null
  | undefined;

export const Input = React.forwardRef((props: InputProps, ref: Ref) => {
  const {
    long,
    full,
    icon,
    success,
    warning,
    error,
    number,
    address,
    className,
  } = props;

  const inputClasses = classNames({
    long: long || address,
    full,
    success,
    warning,
    error,
    number: number || address,
  });

  if (icon) {
    const wrapperClasses = classNames({
      long: long || address,
      full,
    });
    const Icon = icon;
    return (
      <WithIcon className={wrapperClasses}>
        <BaseInput
          {...props}
          className={`${inputClasses} ${className}`}
          ref={ref}
        />
        <Icon size="2rem" />
      </WithIcon>
    );
  }

  return (
    <BaseInput
      {...props}
      className={`${inputClasses} ${className}`}
      ref={ref}
    />
  );
});
