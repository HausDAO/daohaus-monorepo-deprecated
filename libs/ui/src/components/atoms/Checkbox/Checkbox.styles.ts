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
  width: 18px;
  height: 18px;
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

export const LabelContainer = styled.label`
  display: flex;
  align-items: center;
  margin-left: 19px;
  label {
    margin-right: 10px;
  }
  svg {
    transform: translateY(0.1rem);
  }
`;

export const RequiredAsterisk = styled.span`
  margin-right: 8px;
  font-weight: ${font.weight.bold};
  color: ${({ theme }: { theme: Theme }) => theme.warning};
  transform: translateY(-0.25rem);
`;
