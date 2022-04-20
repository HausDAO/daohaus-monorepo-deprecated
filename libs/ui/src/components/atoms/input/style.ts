import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { field } from '../../../theme/component/fieldFamily';
import { font } from '../../../theme/global/font';

export const BaseInput = styled.input`
  background-color: ${({ theme }: { theme: Theme }) => theme.field.bg};
  color: ${({ theme }: { theme: Theme }) => theme.fontColor};
  font-size: ${field.fontSize};
  line-height: 150%;
  font-weight: ${field.fontWeight};
  font-family: ${field.fontFamily};
  height: 4.8rem;
  max-width: ${field.size.md};
  width: 100%;
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.bgColor};
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
  &.number {
    font-family: ${font.family.data};
    font-weight: ${font.weight.reg};
    letter-spacing: 1px;
  }
  &.long {
    max-width: ${field.size.lg};
  }
  &.full {
    max-width: ${field.size.full};
  }
  :disabled {
    background-color: ${({ theme }: { theme: Theme }) => theme.field.disabled};
    cursor: not-allowed;
  }

  &.warning {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.warning};
  }
  &.error {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.error};
  }
`;

export const WithIcon = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: ${field.size.md};
  svg {
    position: absolute;
    color: ${({ theme }: { theme: Theme }) => theme.fontColor};
    top: 1.4rem;
    right: 2rem;
  }
  input {
    padding: 1.2rem 4.2rem 1.2rem 1.8rem;
  }
  &.long {
    max-width: ${field.size.lg};
  }
  &.full {
    max-width: ${field.size.full};
  }
`;
