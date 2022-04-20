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
  letter-spacing: 1.5px;
  padding: 1.2rem 1.8rem;
  transition: ${field.transition};
  ::placeholder {
    color: ${({ theme }: { theme: Theme }) => theme.field.placeholderText};
  }
  :focus {
    background-color: ${({ theme }: { theme: Theme }) => theme.field.focus};
    outline: none;
  }
  &.lg {
    max-width: ${field.size.lg};
  }
  &.full {
    max-width: ${field.size.full};
  }
`;

const Input = ({ placeholder = 'Placeholder' }) => {
  return <StyledInput placeholder={placeholder} />;
};

export default Input;
