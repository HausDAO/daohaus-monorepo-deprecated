import styled from 'styled-components';

import { Card, SingleColumnLayout, widthQuery } from '@daohaus/ui';
import { useDao } from '../contexts/DaoContext';
import { VaultOverview } from '../components/VaultOverview';

const VaultContainer = styled(Card)`
  padding: 3rem;
  border: none;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

export function Vaults() {
  const { dao } = useDao();

  return (
    <SingleColumnLayout title="Vaults">
      <VaultContainer>{dao && <VaultOverview dao={dao} />}</VaultContainer>
    </SingleColumnLayout>
  );
}

export default Vaults;
