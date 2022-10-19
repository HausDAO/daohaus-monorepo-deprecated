import styled, { css } from 'styled-components';

import { Theme } from '../../../types/theming';
import { border } from '../../../theme/global/border';

export const CardStyles = css`
  background-color: ${({ theme }: { theme: Theme }) => theme.card.bg};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.card.border};
  border-radius: ${border.cardRadius};
  padding: 2rem;

  width: ${({ width }: { width: string }) => width};
  max-width: 90vw;
`;

export const BaseCard = styled.div`
  ${CardStyles}/* Saved styles for cards that require hover, focus, or disabled states */

  /*
  :hover {
    background-color: ${({ theme }: { theme: Theme }) => theme.card.hoverBg};
    border: 1px solid ${({ theme }: { theme: Theme }) =>
    theme.card.hoverBorder};
  }

  :focus {
    background-color: ${({ theme }: { theme: Theme }) => theme.card.focusBg};
    border: 1px solid ${({ theme }: { theme: Theme }) =>
    theme.card.focusBorder};
    outline: none;
  }

   :disabled {
    background-color: ${({ theme }: { theme: Theme }) => theme.card.disabledBg};
    border: 1px solid
      ${({ theme }: { theme: Theme }) => theme.card.disabledBorder};
    cursor: not-allowed;
  } */
`;
