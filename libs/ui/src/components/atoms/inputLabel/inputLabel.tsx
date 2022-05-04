import Tooltip from '../tooltip/tooltip';

import {
  InputLabelContainer,
  Label,
  RequiredAsterisk,
} from './inputLabelStyle';

export type InputLabelType = {
  id: string;
  required?: boolean;
  info?: string;
  children: React.ReactChild;
};

const InputLabel = ({
  required,
  info,
  children = 'label',
  id,
}: InputLabelType) => {
  return (
    <InputLabelContainer>
      {required && <RequiredAsterisk>*</RequiredAsterisk>}
      <Label htmlFor={id}>{children}</Label>
      {info && <Tooltip content={info} />}
    </InputLabelContainer>
  );
};

export default InputLabel;
