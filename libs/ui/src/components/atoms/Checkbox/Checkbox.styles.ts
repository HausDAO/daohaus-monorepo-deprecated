import styled from 'styled-components';

import { font } from '../../../theme/global/font';
import { Theme } from '../../../types/theming';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 2px solid
    ${(props) =>
      props.checked
        ? props.theme.checkbox.activeBorder
        : props.theme.checkbox.border};
  border-radius: 1px;
  width: 1.125rem;
  height: 1.125rem;
  :disabled {
    border 2px solid ${({ theme }: { theme: Theme }) => theme.disabled}
  }
`;

export const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  color: ${({ theme }: { theme: Theme }) => theme.primary};
  font-size: 2rem;
  padding-top: 3px;
  :disabled {
    color: ${({ theme }: { theme: Theme }) => theme.disabled};
  }
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 12px;
`;

export const Value = styled.label`
  font-family: ${font.family.body};
  font-size: ${font.size.md};
  font-weight: ${font.weight.reg};
  user-select: none;
`;
