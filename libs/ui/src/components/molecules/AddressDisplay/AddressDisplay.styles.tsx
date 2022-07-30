import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { DataMd, Icon } from '../../atoms';

export const AddressContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

export const AddressDataMd = styled(DataMd)`
  color: ${({ theme }: { theme: Theme }) => theme.secondary};
`;

export const AddressCopyIcon = styled.div`
  cursor: pointer;
  margin-top: 0.5em;
`;
