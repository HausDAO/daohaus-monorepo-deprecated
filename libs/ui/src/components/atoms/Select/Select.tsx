import classNames from 'classnames';
import { forwardRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { BaseSelect, StyledOption, WithIcon } from './Select.styles';
import { SelectProps } from '../../../types/formAndField';
import { useTheme } from 'styled-components';

type Ref =
  | React.RefObject<HTMLSelectElement>
  | ((instance: HTMLSelectElement | null) => void)
  | null
  | undefined;

export const Select = forwardRef(
  (
    {
      options,
      defaultValue,
      inputSelect,
      long,
      full,
      placeholder,
      disabled,
      error,
      warning,
      className,
      containerClassName,
      ...props
    }: SelectProps,
    ref: Ref
  ) => {
    const theme = useTheme();
    const wrapperClasses = classNames({
      'input-select': inputSelect,
      long,
      full,
    });
    const classes = classNames({
      'input-select': inputSelect,
      long,
      full,
      error,
      warning,
    });
    return (
      <WithIcon className={`${containerClassName} ${classes}`}>
        <BaseSelect
          {...props}
          ref={ref}
          className={`${className} ${classes}`}
          defaultValue={defaultValue}
          disabled={disabled}
        >
          {placeholder && (
            <StyledOption value="">--{placeholder}--</StyledOption>
          )}
          {options.map((option) => (
            <StyledOption key={option.key || option.value} value={option.value}>
              {option.name}
            </StyledOption>
          ))}
        </BaseSelect>
        <BiChevronDown
          size="2rem"
          color={disabled ? theme.field.disabledColor : theme.select.text}
        />
      </WithIcon>
    );
  }
);
