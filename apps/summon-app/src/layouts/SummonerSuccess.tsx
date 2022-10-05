import { Bold, Button, H1, ParMd, Link, AddressDisplay } from '@daohaus/ui';

import { InfoSection } from './FormLayouts';
import { HausBlockLoading } from '../components/HausBlockLoading/HausBlockLoading';
import { Keychain, ReactSetter } from '@daohaus/common-utilities';
import { SummonStates } from '../app/App';
import styled from 'styled-components';

type SuccessProps = {
  daoAddress: string;
  chainId: string | null | undefined;
  setSummonState: ReactSetter<SummonStates>;
};

const AddressInfoSection = styled(InfoSection)`
  p,
  div {
    margin-bottom: 1rem;
  }

  a {
    margin-bottom: 1rem;
    align-items: flex-start;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    button {
      width: 200px;
      justify-content: center;
    }
  }
`;

export const SummonerSuccess = ({
  daoAddress,
  chainId,
  setSummonState,
}: SuccessProps) => {
  const handleResetSummon = () => {
    setSummonState('idle');
  };

  return (
    <div className="main-column">
      <H1 className="title">
        <Bold>DAO Summoned</Bold>
      </H1>
      <ParMd>
        Learn more about{' '}
        <Link
          href="https://daohaus.mirror.xyz/U_JQtheSzdpRFqQwf9Ow3LgLNG0WMZ6ibAyrjWDu_fc"
          linkType="external"
        >
          Moloch v3
        </Link>
      </ParMd>
      <HausBlockLoading loading={false} />
      <AddressInfoSection>
        <ParMd className="info">DAO contract:</ParMd>
        <AddressDisplay
          address={daoAddress}
          copy
          explorerNetworkId={chainId as keyof Keychain}
        />
      </AddressInfoSection>
      <ButtonGroup>
        <Link
          linkType="no-icon-external"
          href={`https://admin.daohaus.fun/#/molochv3/${chainId}/${daoAddress}`}
        >
          <Button primary>View DAO</Button>
        </Link>
        <Button secondary onClick={handleResetSummon}>
          <Bold>Summon Another DAO</Bold>
        </Button>
      </ButtonGroup>
    </div>
  );
};
