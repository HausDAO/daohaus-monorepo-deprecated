import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { border } from '../../../theme/global/border';
import { field } from '../../../theme/component/fieldFamily';

export const FieldAlertWrapper = styled.div<{
  color?: string;
  background?: string;
  border?: string;
}>`
  padding: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${border.radius};
  max-width: 600px;
  background: ${({ theme }: { theme: Theme }) => theme.fieldAlert.bg};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.fieldAlert.border};

  &.full {
    max-width: ${field.size.full};
  }

  &.warning {
    p {
      color: ${({ theme }: { theme: Theme }) => theme.fieldAlert.warningText};
    }
    button {
      background-color: ${({ theme }: { theme: Theme }) => theme.fieldAlert.warningButtonBg};
      border: 1px solid ${({ theme }: { theme: Theme }) => theme.fieldAlert.warningButtonBorder};
      :hover {
        background-color: ${({ theme }: { theme: Theme }) => theme.fieldAlert.warningButtonBg};
        border: 1px solid ${({ theme }: { theme: Theme }) => theme.fieldAlert.warningButtonBorder};
      }
      :active {
        background-color: ${({ theme }: { theme: Theme }) => theme.fieldAlert.warningButtonBg};
        border: 1px solid ${({ theme }: { theme: Theme }) => theme.fieldAlert.warningButtonBorder};
      }
    }
  }
`;
