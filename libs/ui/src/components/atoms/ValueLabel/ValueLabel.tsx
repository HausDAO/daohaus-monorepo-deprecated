import {
  ValueLabelContainer,
  Label,
  RequiredAsterisk,
} from './ValueLabel.styles';

export type ValueLabelType = {
  id: string;
  children: React.ReactChild;
  required?: boolean;
};

const ValueLabel = ({ required, children = 'value', id }: ValueLabelType) => {
  return (
    <ValueLabelContainer>
      {required && <RequiredAsterisk>*</RequiredAsterisk>}
      <Label htmlFor={id}>{children}</Label>
    </ValueLabelContainer>
  );
};

export default ValueLabel;
