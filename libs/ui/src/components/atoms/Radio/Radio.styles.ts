import styled from 'styled-components';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { Theme } from '../../../types/theming';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding-bottom: 1.4rem;
`;

export const RadioGroup = RadioGroupPrimitive.Root;

export const RadioIndicator = styled(RadioGroupPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;

    background-color: ${({ theme }: { theme: Theme }) =>
      theme.radio.indicator.bg};
  }

  &[data-disabled] {
    &::after {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.radio.indicator.disabledBg};
    }
  }
`;

// TODO Add Hover & Focus

export const RadioItem = styled(RadioGroupPrimitive.Item)`
  all: unset;
  cursor: pointer;
  width: 2rem;
  height: 2rem;

  background-color: ${({ theme }: { theme: Theme }) => theme.radio.item.bg};
  border: 2px solid ${({ theme }: { theme: Theme }) => theme.radio.item.border};
  border-radius: 100%;
  position: relative;

  &[data-state='checked'] {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.radio.item.activeBg};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.radio.item.activeBg};
  }

  :disabled {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.radio.item.disabledBg};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.radio.item.disabledBorder};
    cursor: not-allowed;
    &[data-state='checked'] {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.radio.item.disabledActive};
      border: 2px solid
        ${({ theme }: { theme: Theme }) => theme.radio.item.disabledActive};
    }
  }
`;

export const LabelContainer = styled.label`
  display: flex;
  align-items: center;
  margin-left: 1.9rem;
  label {
    margin-right: 0.1rem;
  }
  svg {
    transform: translateY(0.1rem);
  }
`;
