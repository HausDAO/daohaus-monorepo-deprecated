import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { field } from '../../../theme/component/fieldFamily';
import { font } from '../../../theme/global/font';

export const BaseTextArea = styled.textarea`
  background-color: ${({ theme }: { theme: Theme }) => theme.field.bg};
  color: ${({ theme }: { theme: Theme }) => theme.fontColor};
  font-size: ${field.fontSize};
  line-height: 150%;
  font-weight: ${field.fontWeight};
  font-family: ${field.fontFamily};
  height: 7.688rem;
  max-width: ${field.size.lg};
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

  :disabled {
    background-color: ${({ theme }: { theme: Theme }) => theme.field.disabled};
    cursor: not-allowed;
    font-style: italic;
    ::placeholder {
      color: ${({ theme }: { theme: Theme }) =>
        theme.field.disabledPlaceholder};
    }
  }

  &.full {
    max-width: ${field.size.full};
  }

  &.warning {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.warning};
  }

  &.error {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.error};
  }
`;
