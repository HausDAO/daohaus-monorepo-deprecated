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
  color: ${({ theme }: { theme: Theme }) => theme.fontColor};
  background: ${({ theme }: { theme: Theme }) => theme.primary};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.secondary};

  &.full {
    max-width: ${field.size.full};
  }

  &.warning {
    color: ${({ theme }: { theme: Theme }) => theme.fieldAlert.warningText};
    background: ${({ theme }: { theme: Theme }) => theme.fieldAlert.warningBg};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.fieldAlert.warningBorder};
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

  &.info {
    color: ${({ theme }: { theme: Theme }) => theme.fieldAlert.infoText};
    background: ${({ theme }: { theme: Theme }) => theme.fieldAlert.infoBg};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.fieldAlert.infoBorder};
  }

  &.error {
    color: ${({ theme }: { theme: Theme }) => theme.fieldAlert.errorText};
    background: ${({ theme }: { theme: Theme }) => theme.fieldAlert.errorBg};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.fieldAlert.errorBorder};
  }
`;
