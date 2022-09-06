import styled from 'styled-components';

import {
  Button,
  Card,
  Link,
  SingleColumnLayout,
  widthQuery,
} from '@daohaus/ui';
import { useDao } from '@daohaus/dao-context';
import { VaultOverview } from '../components/VaultOverview';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { getNetwork } from '@daohaus/common-utilities';

const VaultContainer = styled(Card)`
  padding: 3rem;
  width: 100%;
  border: none;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

const StyledButtonLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`;

export function Vaults() {
  const { dao } = useDao();
  const { daoid, daochain } = useParams();
  const networkData = useMemo(() => {
    if (!daochain) return null;
    return getNetwork(daochain);
  }, [daochain]);

  return (
    <SingleColumnLayout
      title="Vaults"
      actions={[
        <StyledButtonLink
          key={1}
          href={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=TRANSFER_ERC20`}
        >
          <Button secondary>Transfer ERC20</Button>
        </StyledButtonLink>,
        <StyledButtonLink
          key={2}
          href={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=TRANSFER_NETWORK_TOKEN`}
        >
          <Button secondary>Transfer {networkData?.symbol}</Button>
        </StyledButtonLink>,
      ]}
    >
      <VaultContainer>{dao && <VaultOverview dao={dao} />}</VaultContainer>
    </SingleColumnLayout>
  );
}

export default Vaults;
