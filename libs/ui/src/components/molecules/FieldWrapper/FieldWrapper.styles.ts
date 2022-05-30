import styled from 'styled-components';

import { field } from '../../../theme';
import { font } from '../../../theme/global/font';
import { Theme } from '../../../types/theming';

export const FieldWrapperBase = styled.div`
  width: 100%;
  max-width: ${field.size.lg};
  .field-slot {
    margin-bottom: 1.2rem;
  }
  .long {
    max-width: ${field.size.lg};
  }
  .full {
    max-width: ${field.size.full};
  }
`;

export const LabelContainer = styled.label`
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
