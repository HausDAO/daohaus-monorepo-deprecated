import styled from 'styled-components';

import {
  AddressDisplay,
  BiColumnLayout,
  Card,
  DataIndicator,
  widthQuery,
} from '@daohaus/ui';
import { useDao } from '../contexts/DaoContext';
import { useParams } from 'react-router-dom';
import { Keychain } from '@daohaus/common-utilities';

const LeftCard = styled(Card)`
  width: 100%;
  min-width: 54rem;
  max-width: 64rem;
  height: 47rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

const Box = styled.div`
  margin: 2em 0;
`;

export function DaoOverview() {
  const { dao } = useDao();
  const { daochain } = useParams();

  return (
    <BiColumnLayout
      subtitle="DAO"
      title="Overview"
      left={
        <LeftCard>
          <DataIndicator size="lg" label="Vault Total" data="$120k" />
          <DataIndicator
            size="sm"
            label="Expiration Date"
            data="May 10, 2022 15:55pm PST"
            info="this is a tooltip"
          />
          <Box>
            {dao && (
              <AddressDisplay
                truncate
                copy
                address={dao.id}
                explorerNetworkId={daochain as keyof Keychain}
              ></AddressDisplay>
            )}
          </Box>
          <Box>{dao && <AddressDisplay address={dao.id}></AddressDisplay>}</Box>
          <Box>
            {dao && (
              <AddressDisplay
                txHash
                truncate
                address={dao.txHash}
              ></AddressDisplay>
            )}
          </Box>

          {JSON.stringify(dao, null, 2)}
        </LeftCard>
      }
      right={null}
    />
  );
}

export default DaoOverview;
