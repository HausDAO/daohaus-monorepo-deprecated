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
  background-color: ${({ theme }: { theme: Theme }) => theme.element.bg};
  border: 2px solid ${({ theme }: { theme: Theme }) => theme.element.border};
  border-radius: 100%;
  cursor: pointer;
  height: 2rem;
  position: relative;
  width: 2rem;

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
        theme.element.bgHover};
      border: 2px solid
        ${({ theme }: { theme: Theme }) => theme.element.borderHover};
    }

    :focus {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.element.bgFocus};
      border: 2px solid
        ${({ theme }: { theme: Theme }) => theme.element.borderFocus};
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

export const RadioIndicator = styled(RadioGroupPrimitive.Indicator)`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;

  &::after {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.element.indicator};
    border-radius: 50%;
    content: '';
    display: block;
    height: 1rem;
    width: 1rem;
  }

  &[data-disabled] {
    &::after {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.element.indicatorDisabled};
    }
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
