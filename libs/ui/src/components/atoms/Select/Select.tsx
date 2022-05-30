import classNames from 'classnames';
import { forwardRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { BaseSelect, StyledOption, WithIcon } from './Select.styles';
import { Field } from '../../../types/formAndField';

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
    { options, defaultValue, inputSelect, long, full }: SelectProps,
    ref: Ref
  ) => {
    const classes = classNames({ 'input-select': inputSelect, long, full });
    return (
      <WithIcon className={classes}>
        <BaseSelect ref={ref} className={classes}>
          {options.map((option) => (
            <StyledOption
              key={option.key || option.value}
              value={option.value}
              selected={option.value === defaultValue}
            >
              {option.name}
            </StyledOption>
          ))}
        </BaseSelect>
        <BiChevronDown size="2rem" />
      </WithIcon>
    );
  }
);
