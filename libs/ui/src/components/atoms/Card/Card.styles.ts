import styled from 'styled-components';

import { Theme } from '../../../types/theming';

export const BaseCard = styled.div`
  background-color: ${({ theme }: { theme: Theme }) => theme.card.bg};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.card.border};
  border-radius: 0.8rem;
  height: auto;
  padding: 2rem;
  width: auto;

  :hover {
    background-color: ${({ theme }: { theme: Theme }) => theme.card.hoverBg};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.card.hoverBorder};
  }

  :focus {
    background-color: ${({ theme }: { theme: Theme }) => theme.card.focusBg};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.card.focusBorder};
    outline: none;
  }

  :disabled {
    background-color: ${({ theme }: { theme: Theme }) => theme.card.disabledBg};
    border: 1px solid
      ${({ theme }: { theme: Theme }) => theme.card.disabledBorder};
    cursor: not-allowed;
  }
`;
