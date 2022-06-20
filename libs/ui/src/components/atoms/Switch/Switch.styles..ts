import styled from 'styled-components';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { Theme } from '../../../types/theming';
import { font } from '../../../theme/global/font';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
`;

export const SwitchBase = styled(SwitchPrimitive.Root)`
  all: unset;
  background-color: ${({ theme }: { theme: Theme }) => theme.switch.bar.bg};
  border-radius: 9999px;
  cursor: pointer;
  height: 16px;
  left: 9px;
  position: relative;
  width: 54px;

  &[data-disabled] {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.switch.bar.disabledBg};
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.switch.bar.activeBg};

    &[data-disabled] {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.switch.bar.disabledBg};
      cursor: not-allowed;
    }
  }
`;

export const SwitchSlider = styled(SwitchPrimitive.Thumb)`
  background-color: ${({ theme }: { theme: Theme }) => theme.switch.thumb.bg};
  border: 2px solid
    ${({ theme }: { theme: Theme }) => theme.switch.thumb.border};
  border-radius: 9999px;
  height: 34px;
  position: absolute;
  top: -10px;
  transform: translateX(-9px);
  transition: transform 0.4s;
  width: 34px;
  will-change: transform;

  :hover {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.switch.thumb.hoverBg};
    border: 1px solid
      ${({ theme }: { theme: Theme }) => theme.switch.thumb.hoverBorder};
  }

  :focus {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.switch.thumb.focusBg};
    border: 1px solid
      ${({ theme }: { theme: Theme }) => theme.switch.thumb.focusBorder};
    outline: none;
  }

  &[data-disabled] {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.switch.thumb.disabledBg};
    border: 1px solid
      ${({ theme }: { theme: Theme }) => theme.switch.thumb.disabledBorder};
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.switch.thumb.activeBg};
    border: 2px solid
      ${({ theme }: { theme: Theme }) => theme.switch.thumb.activeBorder};
    transform: translateX(27px);

    :hover {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.switch.thumb.activeHoverBg};
      border: 1px solid
        ${({ theme }: { theme: Theme }) => theme.switch.thumb.activeHoverBorder};
    }

    :focus {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.switch.thumb.activeFocusBg};
      border: 1px solid
        ${({ theme }: { theme: Theme }) => theme.switch.thumb.activeFocusBorder};
      outline: none;
    }

    &[data-disabled] {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.switch.thumb.activeDisabledBg};
      border: 1px solid
        ${({ theme }: { theme: Theme }) =>
          theme.switch.thumb.activeDisabledBorder};
      cursor: not-allowed;
    }
  }
`;

export const LabelContainer = styled.label`
  align-items: center;
  display: flex;
  margin-left: 28px;

  label {
    margin-right: 10px;
  }

  svg {
    transform: translateY(0.1rem);
  }
`;

export const StyledLabel = styled.label`
  color: white;
  font-family: ${font.family.body};
  font-weight: ${font.weight.reg};
  font-size: ${font.size.md};

  &.disabled {
    color: ${({ theme }: { theme: Theme }) => theme.switch.thumb.disabledBg};
  }
`;
