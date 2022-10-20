import styled from 'styled-components';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { Theme } from '../../../types/theming';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding-bottom: 1.4rem;
`;

export const RadioGroup = RadioGroupPrimitive.Root;

export const RadioItem = styled(RadioGroupPrimitive.Item)`
  all: unset;
  background-color: ${({ theme }: { theme: Theme }) => theme.radio.item.bg};
  border: 2px solid ${({ theme }: { theme: Theme }) => theme.radio.item.border};
  border-radius: 100%;
  cursor: pointer;
  height: 2rem;
  position: relative;
  width: 2rem;

  :hover {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.radio.item.hoverBg};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.radio.item.hoverBorder};
  }

  :focus {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.radio.item.focusBg};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.radio.item.focusBorder};
    outline: none;
  }

  :disabled {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.radio.item.disabledBg};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.radio.item.disabledBorder};
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.radio.item.activeBg};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.radio.item.activeBg};

    :hover {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.radio.item.activeHoverBg};
      border: 2px solid
        ${({ theme }: { theme: Theme }) => theme.radio.item.activeHoverBorder};
    }

    :focus {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.radio.item.activeFocusBg};
      border: 2px solid
        ${({ theme }: { theme: Theme }) => theme.radio.item.activeFocusBorder};
      outline: none;
    }

    :disabled {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.radio.item.activeDisabledBg};
      border: 2px solid
        ${({ theme }: { theme: Theme }) =>
          theme.radio.item.activeDisabledBorder};
      cursor: not-allowed;
    }
  }
`;

export const RadioIndicator = styled(RadioGroupPrimitive.Indicator)`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;

  &::after {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.radio.indicator.bg};
    border-radius: 50%;
    content: '';
    display: block;
    height: 1rem;
    width: 1rem;
  }

  &[data-disabled] {
    &::after {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.radio.indicator.disabledBg};
    }
  }
`;

export const LabelContainer = styled.label`
  align-items: center;
  display: flex;
  margin-left: 1.9rem;

  label {
    margin-right: 0.1rem;
  }

  svg {
    transform: translateY(0.1rem);
  }
`;
