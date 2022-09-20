import styled, { css } from 'styled-components';

import { Theme } from '../../../types/theming';
import { border } from '../../../theme/global/border';

export const CardStyles = css`
  background-color: ${({ theme }: { theme: Theme }) => theme.card.bg};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.card.border};
  border-radius: ${border.cardRadius};
  padding: 2rem;
  /* min-width: 40rem; */

  width: ${({ width }: { width: string }) => width};
  max-width: 90vw;
`;

export const BaseCard = styled.div`
  ${CardStyles}/* Disabling the interaction styles here as per our meeting in the component sync */
  /* Saving the styles here for when we want to make an interactive card */

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
  } */

  /* We might not need this */
  /* :disabled {
    background-color: ${({ theme }: { theme: Theme }) => theme.card.disabledBg};
    border: 1px solid
      ${({ theme }: { theme: Theme }) => theme.card.disabledBorder};
    cursor: not-allowed;
  } */
`;
