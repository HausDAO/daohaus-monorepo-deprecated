import styled from 'styled-components';

import { font } from '../../../theme/global/font';
import { Theme } from '../../../types/theming';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  background-color: transparent;
  width: 18px;
  height: 18px;
  border-radius: 1px;
  border: 2px solid
    ${(props) =>
      props.checked
        ? props.theme.checkbox.activeBorder
        : props.theme.checkbox.border};
  display: flex;
  align-items: center;
  justify-content: center;
  :disabled {
    border 2px solid ${({ theme }: { theme: Theme }) => theme.disabled}
  }
`;

export const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  padding-top: 3px;
  font-size: 2rem;
  color: ${({ theme }: { theme: Theme }) => theme.primary};
  :disabled {
    color: ${({ theme }: { theme: Theme }) => theme.disabled};
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Value = styled.label`
  font-family: ${font.family.body};
  font-weight: ${font.weight.reg};
  font-size: ${font.size.md};
  user-select: none;
`;
