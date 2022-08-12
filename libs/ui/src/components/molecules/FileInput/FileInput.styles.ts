import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { ParSm } from '../../atoms';

export const FileInputContents = styled.div`
  padding: 3.6rem 0;
  display: flex;
`;

export const ImageDisplayWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 3.4rem;
  padding: 1rem;
  background: ${({ theme }: { theme: Theme }) => theme.card.bg};
`;

export const CancelParSm = styled(ParSm)`
  margin-left: 1rem;
  color: ${({ theme }: { theme: Theme }) => theme.checkbox.border};
  :hover {
    cursor: pointer;
  }
`;
