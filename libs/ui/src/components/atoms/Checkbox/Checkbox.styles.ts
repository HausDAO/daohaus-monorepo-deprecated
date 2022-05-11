import styled from 'styled-components';

import { font } from '../../../theme/global/font';
import { Theme } from '../../../types/theming';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

// background-color: ${({ theme }: { theme: Theme }) =>
//   theme.button.secondary.bg};
export const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  background-color: transparent;
  width: 18px;
  height: 18px;
  border-radius: 1px;
  border: 2px solid #f2cf63;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  padding-top: 3px;
  font-size: 2rem;
  color: #f2cf63;
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
