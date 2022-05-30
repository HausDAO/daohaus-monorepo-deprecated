import React from 'react';
import { BaseSelect } from './Select.styles';

type OptionType = {
  name: string;
  value: string;
  key?: string;
};
type SelectProps = {
  default: string;
  options: OptionType[];
};

export const Select = ({ options }: SelectProps) => {
  return (
    <BaseSelect>
      {options.map((option) => (
        <option key={option.key || option.value}>{option.name}</option>
      ))}
    </BaseSelect>
  );
};
