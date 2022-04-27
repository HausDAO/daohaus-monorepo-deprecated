import React from 'react';
import { DropdownBase } from './dropdownStyle';

type DropdownProps = {
  test: string;
};
const Dropdown = ({ test }: DropdownProps) => {
  return <DropdownBase>{test}</DropdownBase>;
};

export default Dropdown;
