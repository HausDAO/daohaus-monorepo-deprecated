import styled from 'styled-components';
import { AddressDisplay, Button, DataSm, widthQuery } from '@daohaus/ui';

import { TDao } from '@daohaus/dao-context';
import { useParams } from 'react-router-dom';
import { Keychain } from '@daohaus/common-utilities';

const ShamanContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  div {
    margin-top: 3rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
  .contract {
    width: 60%;
  }
  .manage {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 40%;
  }
`;

type ShamanListProps = {
  shamen: TDao['shamen'];
};

export const ShamanList = ({ shamen }: ShamanListProps) => {
  const { daochain } = useParams();
  return (
    <>
      <ShamanContainer>
        <div className="contract">
          <DataSm>Contract</DataSm>
        </div>
        <div>
          <DataSm>Permissions</DataSm>
        </div>
      </ShamanContainer>
      {shamen &&
        shamen.map((shaman) => (
          <ShamanContainer key={shaman.id}>
            <span className="contract">
              <AddressDisplay
                address={shaman.shamanAddress}
                explorerNetworkId={daochain as keyof Keychain}
              />
            </span>
            <div className="manage">
              <DataSm>{shaman.permissions}</DataSm>
              <Button>Manage</Button>
            </div>
          </ShamanContainer>
        ))}
    </>
  );
};
