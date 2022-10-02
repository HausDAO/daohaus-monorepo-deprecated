import { Label, Select, SelectProps, widthQuery } from '@daohaus/ui';
import React from 'react';
import styled from 'styled-components';

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  width: 32rem;
  label {
    display: block;
    width: 10rem;
  }
  @media ${widthQuery.sm} {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
`;
type SortDropdownProps = SelectProps;

export const SortDropdown = ({
  id = 'sort-select',
  label = 'Sort By',
  options,
  ...props
}: SortDropdownProps) => {
  return (
    <SelectBox>
      <Label id="sort-select">{label}</Label>
      <Select
        id={id}
        options={options.map((option) => ({
          name: option.name,
          value: option.value,
        }))}
        full
        {...props}
      />
    </SelectBox>
  );
};
