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
  background-color: ${({ theme }: { theme: Theme }) => theme.element.bg};
  border: 2px solid ${({ theme }: { theme: Theme }) => theme.element.border};
  border-radius: 1px;
  cursor: pointer;
  display: flex;
  height: 18px;
  justify-content: center;
  width: 18px;

  :hover {
    background-color: ${({ theme }: { theme: Theme }) => theme.element.bgHover};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.element.borderHover};
  }

  :focus {
    background-color: ${({ theme }: { theme: Theme }) => theme.element.bgFocus};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.element.borderFocus};
    outline: none;
  }

  :disabled {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.element.bgDisabled};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.element.borderDisabled};
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.element.bgActive};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.element.borderActive};

    :hover {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.element.bgActiveHover};
      border: 2px solid
        ${({ theme }: { theme: Theme }) => theme.element.borderActiveHover};
    }

    :focus {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.element.bgActiveFocus};
      border: 2px solid
        ${({ theme }: { theme: Theme }) => theme.element.borderActiveFocus};
      outline: none;
    }

    :disabled {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.element.bgActiveDisabled};
      border: 2px solid
        ${({ theme }: { theme: Theme }) => theme.element.borderActiveDisabled};
      cursor: not-allowed;
    }
  }
`;

export const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  color: ${({ theme }: { theme: Theme }) => theme.element.indicator};
  font-size: 2rem;
  padding-top: 3px;
  :disabled {
    color: ${({ theme }: { theme: Theme }) => theme.element.indicatorDisabled};
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
  color: ${({ theme }: { theme: Theme }) => theme.warning.step9};
  font-weight: ${font.weight.bold};
  margin-right: 8px;
  transform: translateY(-0.25rem);
`;
