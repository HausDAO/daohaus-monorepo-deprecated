import { Bold, Button, H1, ParLg, ParMd, TemporaryLink } from '@daohaus/ui';
import { ExplorerLink } from '@daohaus/daohaus-connect-feature';

import { InfoSection } from './FormLayouts';
import { HausBlockLoading } from '../components/HausBlockLoading/HausBlockLoading';
import { ReactSetter } from '@daohaus/common-utilities';
import { SummonStates } from '../app/App';

type ErrorProps = {
  daoAddress: string;
  setSummonState: ReactSetter<SummonStates>;
  errMsg: string;
};

export const SummonError = ({
  daoAddress,
  setSummonState,
  errMsg,
}: ErrorProps) => {
  const handleResetSummon = () => {
    setSummonState('idle');
  };

  return (
    <div className="main-column">
      <H1>
        <Bold>Summon Error</Bold>
      </H1>
      <ParMd>
        Visit <TemporaryLink>Docs</TemporaryLink> for Help
      </ParMd>
      <HausBlockLoading loading={false} />
      <InfoSection>
        <ParLg className="info">
          <Bold>Summon Failed:</Bold>
        </ParLg>
        {errMsg && <ParMd>{errMsg}</ParMd>}
        <ExplorerLink address={daoAddress}>View Transaction</ExplorerLink>
      </InfoSection>
      <Button secondary onClick={handleResetSummon}>
        Summon Another DAO
      </Button>
    </div>
  );
};
