import classNames from 'classnames';
import { forwardRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { BaseSelect, StyledOption, WithIcon } from './Select.styles';
import { Field } from '../../../types/formAndField';
import { useTheme } from 'styled-components';

type OptionType = {
  name: string;
  value: string;
  key?: string;
};
type SelectProps = Field & {
  defaultValue?: string;
  options: OptionType[];
  inputSelect?: boolean;
};

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
      ...props
    }: SelectProps,
    ref: Ref
  ) => {
    const theme = useTheme();
    const classes = classNames({ 'input-select': inputSelect, long, full });
    return (
      <WithIcon className={classes}>
        <BaseSelect
          ref={ref}
          className={classes}
          defaultValue={defaultValue}
          disabled={disabled}
          {...props}
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
