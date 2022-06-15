import styled from 'styled-components';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { font } from '../../../theme/global/font';
import { Theme } from '../../../types/theming';

export const Container = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 12px;
`;

// TODO Add hover and focus
export const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }: { theme: Theme }) => theme.checkbox.bg};
  border: 2px solid ${({ theme }: { theme: Theme }) => theme.checkbox.border};
  border-radius: 1px;
  width: 18px;
  height: 18px;

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
    }
  }
`;

export const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  color: ${({ theme }: { theme: Theme }) => theme.primary};
  font-size: 2rem;
  padding-top: 3px;
  :disabled {
    color: ${({ theme }: { theme: Theme }) => theme.checkbox.disabledBg};
  }
`;

export const LabelContainer = styled.label`
  display: flex;
  align-items: center;
  margin-left: 19px;
  label {
    margin-right: 10px;
  }
  svg {
    transform: translateY(0.1rem);
  }
`;

export const RequiredAsterisk = styled.span`
  margin-right: 8px;
  font-weight: ${font.weight.bold};
  color: ${({ theme }: { theme: Theme }) => theme.warning};
  transform: translateY(-0.25rem);
`;
