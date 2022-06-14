import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { field } from '../../../theme/component/fieldFamily';
import { font } from '../../../theme/global/font';

export const BaseInput = styled.input`
  background-color: ${({ theme }: { theme: Theme }) => theme.field.bg};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.field.border};
  border-radius: ${field.borderRadius};
  color: ${({ theme }: { theme: Theme }) => theme.fontColor};
  font-size: ${field.fontSize};
  font-weight: ${field.fontWeight};
  font-family: ${field.fontFamily};
  line-height: 150%;
  letter-spacing: 1.5px;
  padding: 1.2rem 1.8rem;
  transition: ${field.transition};
  height: 4.8rem;
  width: 100%;
  max-width: ${field.size.md};

  ::placeholder {
    color: ${({ theme }: { theme: Theme }) => theme.field.placeholderText};
  }

  :hover {
    background-color: ${({ theme }: { theme: Theme }) => theme.field.hoverBg};
    border: 1px solid
      ${({ theme }: { theme: Theme }) => theme.field.hoverBorder};
  }

  :focus {
    background-color: ${({ theme }: { theme: Theme }) => theme.field.focusBg};
    border: 1px solid
      ${({ theme }: { theme: Theme }) => theme.field.focusBorder};
    outline: none;
  }

  :disabled {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.field.disabledBg};
    border: 1px solid
      ${({ theme }: { theme: Theme }) => theme.field.disabledBorder};
    color: ${({ theme }: { theme: Theme }) => theme.field.disabledPlaceholder};
    cursor: not-allowed;
    font-style: italic;
    ::placeholder {
      color: ${({ theme }: { theme: Theme }) =>
        theme.field.disabledPlaceholder};
    }
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

  &.input-select {
    max-width: ${field.size.full};
  }

  &.success {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.success};
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
