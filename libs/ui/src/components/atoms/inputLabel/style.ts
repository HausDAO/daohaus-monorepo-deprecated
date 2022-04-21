import { font } from '../../../theme/global/font';
import { Theme } from '../../../types/theming';
import styled from 'styled-components';

export const BaseInputlabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  label {
    margin-right: 10px;
  }
  svg {
    transform: translateY(0.1rem);
  }
  .required-asterisk {
    margin-right: 8px;
    font-weight: ${font.weight.bold};
    color: ${({ theme }: { theme: Theme }) => theme.warning};
    transform: translateY(-0.25rem);
  }
`;
