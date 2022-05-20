import { StyledLabel } from './Label.style';

type LabelProps = {
  id?: string;
  children: React.ReactChild;
};

export const Label: React.FC<LabelProps> = ({
  children = 'label',
  id,
}: LabelProps) => {
  return <StyledLabel htmlFor={id}>{children}</StyledLabel>;
};
