import React from 'react';
import styled from 'styled-components';

import { Field, SelectProps } from '../../../types/formAndField';
import { field } from '../../../theme/component/fieldFamily';
import { Input, Select } from '../../atoms';

const InputSelectBox = styled.div`
  display: flex;
  width: 100%;
  max-width: ${field.size.md};
  .select {
    max-width: 10rem;
    padding: 0 1.2rem;
    border-radius: 0 ${field.borderRadius} ${field.borderRadius} 0;
    border: none;
    color: white;
    background-color: ;
  }
  .select-box {
    max-width: 10rem;
    svg {
      right: 0.8rem;
    }
  }
  .input {
    border-right: none;
    border-radius: ${field.borderRadius} 0 0 ${field.borderRadius};
  }
`;

type InputSelectProps = Field &
  SelectProps & { selectId: string; selectPlaceholder: string };

export const InputSelect = ({
  selectId,
  id,
  options,
  disabled,
  ...props
}: InputSelectProps) => {
  return (
    <InputSelectBox>
      <Input id={id} disabled={disabled} className="input" full />
      <Select
        id={selectId}
        options={options}
        disabled={disabled}
        className="select"
        containerClassName="select-box"
      />
    </InputSelectBox>
  );
};
