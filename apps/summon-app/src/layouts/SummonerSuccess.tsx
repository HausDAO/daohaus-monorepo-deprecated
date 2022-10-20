import { Bold, Button, H1, ParMd, Link } from '@daohaus/ui';
import { ExplorerLink } from '@daohaus/daohaus-connect-feature';

import { InfoSection } from './FormLayouts';
import { HausBlockLoading } from '../components/HausBlockLoading/HausBlockLoading';
import { ReactSetter } from '@daohaus/common-utilities';
import { SummonStates } from '../app/App';

type SuccessProps = {
  daoAddress: string;
  setSummonState: ReactSetter<SummonStates>;
};

export const SummonerSuccess = ({
  daoAddress,
  setSummonState,
}: SuccessProps) => {
  const handleResetSummon = () => {
    setSummonState('idle');
  };

  return (
    <div className="main-column">
      <H1>
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
      <InfoSection>
        <ParMd className="info">DAO contract:</ParMd>
        <ExplorerLink address={daoAddress}>{daoAddress}</ExplorerLink>
      </InfoSection>
      <Button secondary onClick={handleResetSummon}>
        Summon Another DAO
      </Button>
    </div>
  );
};
