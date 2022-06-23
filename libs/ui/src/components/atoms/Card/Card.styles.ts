import styled from 'styled-components';

import { Theme } from '../../../types/theming';

export const BaseCard = styled.div`
  background-color: ${({ theme }: { theme: Theme }) => theme.card.bg};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.card.border};
  border-radius: 0.8rem;
  padding: 2rem;
`;
