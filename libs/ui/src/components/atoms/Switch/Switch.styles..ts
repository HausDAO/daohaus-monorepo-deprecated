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
  cursor: pointer;
  width: 54px;
  height: 16px;
  left: 9px;

  background-color: ${({ theme }: { theme: Theme }) => theme.switch.bar.bg};
  border-radius: 9999px;
  position: relative;
  &[data-state='checked'] {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.switch.bar.activeBg};
  }
  :disabled {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.switch.bar.disabledBg};
    cursor: not-allowed;
  }
`;

export const SwitchSlider = styled(SwitchPrimitive.Thumb)`
  position: absolute;
  width: 36px;
  height: 36px;
  top: -10px;

  background-color: ${({ theme }: { theme: Theme }) => theme.switch.thumb.bg};
  border-radius: 9999px;
  transition: transform 0.4s;
  transform: translateX(-9px);
  will-change: transform;
  &[data-state='checked'] {
    transform: translateX(27px);
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.switch.thumb.activeBg};
  }
  &.disabled {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.switch.thumb.disabledBg};
  }
`;

export const LabelContainer = styled.label`
  display: flex;
  align-items: center;
  margin-left: 28px;
  label {
    margin-right: 10px;
  }
  svg {
    transform: translateY(0.1rem);
  }
`;

export const StyledLabel = styled.label`
  font-family: ${font.family.body};
  font-weight: ${font.weight.reg};
  font-size: ${font.size.md};
  color: white;
  &.disabled {
    color: ${({ theme }: { theme: Theme }) => theme.switch.thumb.disabledBg};
  }
`;
