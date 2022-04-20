import { Theme } from '../../../types/theming';
import styled from 'styled-components';
import { field } from '../../../theme/component/fieldFamily';

const StyledInput = styled.input`
  background-color: ${({ theme }: { theme: Theme }) => theme.field.bg};
  color: ${({ theme }: { theme: Theme }) => theme.fontColor};
  font-size: ${field.fontSize};
  line-height: 150%;
  font-weight: ${field.fontWeight};
  font-family: ${field.fontFamily};
  height: 4.8rem;
  max-width: ${field.size.md};
  width: 100%;
  border: none;
  border-radius: ${field.borderRadius};
  letter-spacing: 1.2px;
  padding: 12px 18px;
  transition: ${field.transition};
  ::placeholder {
    color: ${({ theme }: { theme: Theme }) => theme.field.placeholderText};
  }
  :focus {
    background-color: ${({ theme }: { theme: Theme }) => theme.field.focus};
    outline: none;
  }
  &.lg {
    max-width: 52rem;
  }
  &.full {
    max-width: 100%;
  }
`;

const Input = () => {
  // const theme = useTheme();
  return <StyledInput />;
};

export default Input;
