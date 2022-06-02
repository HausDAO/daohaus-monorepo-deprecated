import classNames from 'classnames';

import { Field, SelectProps } from '../../../types/formAndField';
import { Input, Select } from '../../atoms';
import { InputSelectBox } from './inputSelect.style';

type InputSelectProps = Field &
  SelectProps & { selectId: string; selectPlaceholder: string };

export const InputSelect = ({
  selectId,
  id,
  options,
  disabled,
  long,
  full,
  selectPlaceholder,
}: InputSelectProps) => {
  const classes = classNames({ long, full });
  return (
    <InputSelectBox className={classes}>
      <Input id={id} disabled={disabled} className="input" full />
      <Select
        id={selectId}
        options={options}
        disabled={disabled}
        className="select"
        containerClassName="select-box"
        placeholder={selectPlaceholder}
      />
    </InputSelectBox>
  );
};
