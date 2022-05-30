import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from './Select.styles';
import React from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { SelectRoot } from './Select.styles';

type OptionType = {
  name: string;
  value: string;
  key?: string;
};
type SelectProps = {
  defaultValue?: string;
  options: OptionType[];
};

export const Select = ({
  options,
  defaultValue = 'defaultValue',
}: SelectProps) => {
  return (
    <SelectRoot defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue />
        <SelectIcon>
          <BiChevronDown />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent>
        <SelectViewport>
          {options.map((option) => (
            <SelectItem key={option.key || option.value} value={option.value}>
              <SelectItemText>{option.name}</SelectItemText>
            </SelectItem>
          ))}
        </SelectViewport>
      </SelectContent>
    </SelectRoot>
  );
};
