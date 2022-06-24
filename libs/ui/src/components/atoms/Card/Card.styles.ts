import styled from 'styled-components';

import { Theme } from '../../../types/theming';

export const BaseCard = styled.div`
  background-color: ${({ theme }: { theme: Theme }) => theme.card.bg};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.card.border};
  border-radius: 0.8rem;
  padding: 2rem;

  &.success {
    background-color: ${({ theme }: { theme: Theme }) => theme.card.successBg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.card.successBorder};
  }

  &.warning {
    background-color: ${({ theme }: { theme: Theme }) => theme.card.warningBg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.card.warningBorder};
  }

  &.error {
    background-color: ${({ theme }: { theme: Theme }) => theme.card.errorBg};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.card.errorBorder};
  }
`;
