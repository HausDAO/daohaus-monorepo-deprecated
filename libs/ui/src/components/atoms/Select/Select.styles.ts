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
    pointer-events: none;
  }

  &.long {
    max-width: ${field.size.lg};
  }

  &.full {
    max-width: ${field.size.full};
  }

  &.warning {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.warning.step9};
  }

  &.error {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.danger.step9};
  }
`;

export const BaseSelect = styled.select`
  align-items: center;
  appearance: none;
  background-color: ${({ theme }: { theme: Theme }) => theme.select.bg};
  border: 1px ${({ theme }: { theme: Theme }) => theme.select.borderColor} solid;
  border-radius: ${field.borderRadius};
  color: ${({ theme }: { theme: Theme }) => theme.select.text};
  display: inline-flex;
  font-size: ${field.fontSize};
  font-weight: ${field.fontWeight};
  font-family: ${field.fontFamily};
  height: 4.8rem;
  justify-content: space-between;
  line-height: 150%;
  max-width: ${field.size.md};
  padding: 0 1.8rem;
  transition: ${field.transition};
  width: 100%;

  &.long {
    max-width: ${field.size.lg};
  }
  &.full {
    max-width: ${field.size.full};
  }
  &.warning {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.warning.step9};
  }

  &.error {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.danger.step9};
  }

  :hover {
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step4};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.secondary.step4};
  }

  :focus {
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.secondary.step6};
    outline: none;
  }

  :disabled {
    background-color: ${({ theme }: { theme: Theme }) => theme.neutral.step5};
    color: ${({ theme }: { theme: Theme }) => theme.neutral.step5};
    cursor: not-allowed;
    font-style: italic;

    ::placeholder {
      color: ${({ theme }: { theme: Theme }) => theme.neutral.step10};
    }
  }
`;

export const StyledOption = styled.option`
  background-color: ${({ theme }: { theme: Theme }) => theme.select.bg};
  color: ${({ theme }: { theme: Theme }) => theme.select.text};
  font-family: ${field.fontFamily};
  font-size: ${field.fontSize};
  font-weight: ${field.fontWeight};
  height: 4.8rem;
`;
