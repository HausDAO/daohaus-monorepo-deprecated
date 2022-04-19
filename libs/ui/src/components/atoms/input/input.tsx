import styled, { useTheme } from 'styled-components';

const StyledInput = styled.input`
  background-color: ${Field.BgColor};
  color: ${Field.TextColor};
  font-size: ${Field.FontSize};
  line-height: 2.4rem;
  font-weight: ${Font.Weight.Medium};
  font-family: ${Field.Font};
  height: 4.8rem;
  max-width: ${Field.Size.Md};
  width: 100%;
  border: none;
  border-radius: ${Field.BorderRadius};
  letter-spacing: 1.2px;
  padding: 12px 18px;
  transition: ${Field.Transition};
  ::placeholder {
    color: ${Field.PlaceHolderColor};
  }
  :focus {
    background-color: ${Field.BgColor_Focus};
    outline: none;
  }
  &.long {
    max-width: 52rem;
  }
`;

const Input = () => {
  const theme = useTheme();
  return <StyledInput theme={theme} />;
};

export default Input;
