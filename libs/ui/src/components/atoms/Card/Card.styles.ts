import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { field } from '../../../theme/component/fieldFamily';
import { font } from '../../../theme/global/font';

export const BaseCard = styled.div`
  background-color: ${({ theme }: { theme: Theme }) => theme.card.bg};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.card.border};
  border-radius: 0.5rem;
  height: 7.5rem;
  width: 24.688rem;
  padding: 2rem;
`;
