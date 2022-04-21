import { font } from '../../../theme/global/font';
import { Theme } from '../../../types/theming';
import styled from 'styled-components';

export const InputLabelContainer = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
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
