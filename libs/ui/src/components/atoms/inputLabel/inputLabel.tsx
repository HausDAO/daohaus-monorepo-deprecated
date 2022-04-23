import Tooltip from '../tooltip/tooltip';
import { ParMd } from '../typography';
import { InputLabelContainer, RequiredAsterisk } from './inputLabelStyle';

export type InputLabelType = {
  required?: boolean;
  info?: string;
  children: React.ReactChild;
};

const InputLabel = ({ required, info, children = 'label' }: InputLabelType) => {
  return (
    <InputLabelContainer>
      {required && <RequiredAsterisk>*</RequiredAsterisk>}
      <ParMd>{children}</ParMd>
      {info && <Tooltip content={info} />}
    </InputLabelContainer>
  );
};

export default InputLabel;
