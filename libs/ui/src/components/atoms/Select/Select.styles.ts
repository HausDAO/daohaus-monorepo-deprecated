import styled from 'styled-components';
import { field } from '../../../theme/component/fieldFamily';
import { Theme } from '../../../types/theming';

export const WithIcon = styled.div`
  position: relative;
  width: 100%;
  max-width: ${field.size.md};
  svg {
    position: absolute;
    color: ${({ theme }: { theme: Theme }) => theme.select.text};
    top: 1.4rem;
    right: 2rem;
  }

  &.long {
    max-width: ${field.size.lg};
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

export const BaseSelect = styled.select`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }: { theme: Theme }) => theme.select.bg};
  appearance: none;
  color: ${({ theme }: { theme: Theme }) => theme.select.text};
  font-size: ${field.fontSize};
  font-weight: ${field.fontWeight};
  font-family: ${field.fontFamily};
  width: 100%;
  line-height: 150%;
  max-width: ${field.size.md};
  height: 4.8rem;
  padding: 0 1.8rem;
  border: 1px ${({ theme }: { theme: Theme }) => theme.select.borderColor} solid;
  transition: ${field.transition};
  border-radius: ${field.borderRadius};

  &.long {
    max-width: ${field.size.lg};
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

  :disabled {
    background-color: ${({ theme }: { theme: Theme }) => theme.field.disabled};
    cursor: not-allowed;
    font-style: italic;
    color: ${({ theme }: { theme: Theme }) => theme.field.disabledColor};
    ::placeholder {
      color: ${({ theme }: { theme: Theme }) =>
        theme.field.disabledPlaceholder};
    }
  }
`;
export const StyledOption = styled.option`
  background-color: ${({ theme }: { theme: Theme }) => theme.select.bg};
  color: ${({ theme }: { theme: Theme }) => theme.select.text};
  font-size: ${field.fontSize};
  font-weight: ${field.fontWeight};
  font-family: ${field.fontFamily};
  height: 4.8rem;
`;
