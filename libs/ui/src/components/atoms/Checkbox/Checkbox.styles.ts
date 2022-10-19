import styled from 'styled-components';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { font } from '../../../theme/global/font';
import { Theme } from '../../../types/theming';

export const Container = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 12px;
`;

export const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  align-items: center;
  background-color: ${({ theme }: { theme: Theme }) => theme.checkbox.bg};
  border: 2px solid ${({ theme }: { theme: Theme }) => theme.checkbox.border};
  border-radius: 1px;
  cursor: pointer;
  display: flex;
  height: 18px;
  justify-content: center;
  width: 18px;

  :hover {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.checkbox.hoverBg};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.checkbox.hoverBorder};
  }

  :focus {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.checkbox.focusBg};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.checkbox.focusBorder};
    outline: none;
  }

  :disabled {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.checkbox.disabledBg};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.checkbox.disabledBorder};
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.checkbox.activeBg};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.checkbox.activeBorder};

    :hover {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.checkbox.activeHoverBg};
      border: 2px solid
        ${({ theme }: { theme: Theme }) => theme.checkbox.activeHoverBorder};
    }

    :focus {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.checkbox.activeFocusBg};
      border: 2px solid
        ${({ theme }: { theme: Theme }) => theme.checkbox.activeFocusBorder};
      outline: none;
    }

    :disabled {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.checkbox.activeDisabledBg};
      border: 2px solid
        ${({ theme }: { theme: Theme }) => theme.checkbox.activeDisabledBorder};
      cursor: not-allowed;
    }
  }
`;

export const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  color: ${({ theme }: { theme: Theme }) => theme.primary.step9};
  font-size: 2rem;
  padding-top: 3px;
  :disabled {
    color: ${({ theme }: { theme: Theme }) => theme.checkbox.disabledBg};
  }
`;

export const LabelContainer = styled.label`
  align-items: center;
  display: flex;
  margin-left: 1.2rem;
  label {
    margin-right: 0.1rem;
  }
  svg {
    transform: translateY(0.1rem);
  }
`;

export const RequiredAsterisk = styled.span`
  color: ${({ theme }: { theme: Theme }) => theme.warning};
  font-weight: ${font.weight.bold};
  margin-right: 8px;
  transform: translateY(-0.25rem);
`;
