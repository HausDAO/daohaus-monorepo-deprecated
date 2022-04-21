import Tooltip from '../tooltip/tooltip';
import { ParMd } from '../typography';
import { InputLabelType } from './inputLabelType';
import { InputLabelContainer, RequiredAsterisk } from './inputLabelStyle';

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
