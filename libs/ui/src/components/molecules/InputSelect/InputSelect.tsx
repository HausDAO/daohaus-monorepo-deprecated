import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import { InputSelectProps } from '../../../types/formAndField';

import { Input, Select } from '../../atoms';
import { InputSelectBox } from './inputSelect.style';

export const InputSelect = ({
  selectId,
  id,
  options,
  disabled,
  long,
  full,
  error,
  warning,
  selectPlaceholder,
  registerSelect = {},
  registerInput = {},
}: InputSelectProps & {
  registerSelect?: UseFormRegisterReturn | Record<string, unknown>;
  registerInput?: UseFormRegisterReturn | Record<string, unknown>;
}) => {
  const classes = classNames({ long, full });
  return (
    <InputSelectBox className={classes}>
      <Input
        id={id}
        disabled={disabled}
        className="input"
        error={error}
        warning={warning}
        full
        {...registerInput}
      />
      <Select
        id={selectId}
        options={options}
        disabled={disabled}
        className="select"
        containerClassName="select-box"
        placeholder={selectPlaceholder}
        error={error}
        warning={warning}
        {...registerSelect}
      />
    </InputSelectBox>
  );
};
