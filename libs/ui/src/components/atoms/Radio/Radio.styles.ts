import styled from 'styled-components';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { Theme } from '../../../types/theming';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding-bottom: 14px;
`;

export const RadioGroup = styled(RadioGroupPrimitive.Root)``;

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
    width: 10px;
    height: 10px;
    border-radius: 50%;

    background-color: ${({ theme }: { theme: Theme }) =>
      theme.radio.indicator.disabledBg};
  }

  &[data-disabled] {
    &::after {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.radio.indicator.disabledBg};
    }
  }
`;

export const RadioItem = styled(RadioGroupPrimitive.Item)`
  all: unset;
  cursor: pointer;
  width: 20px;
  height: 20px;

  background-color: ${({ theme }: { theme: Theme }) => theme.radio.item.bg};
  border: 2px solid ${({ theme }: { theme: Theme }) => theme.radio.item.border};
  border-radius: 9999px;
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
      background-color: ${({ theme }: { theme: Theme }) => theme.disabled};
      border: 2px solid ${({ theme }: { theme: Theme }) => theme.disabled};
    }
  }
`;

export const LabelContainer = styled.label`
  display: flex;
  align-items: center;
  margin-left: 19px;
  label {
    margin-right: 1px;
  }
  svg {
    transform: translateY(0.1rem);
  }
`;
