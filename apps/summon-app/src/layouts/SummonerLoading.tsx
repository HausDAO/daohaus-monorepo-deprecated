import { Bold, H1, ParMd, TemporaryLink } from '@daohaus/ui';
import { ExplorerLink } from '@daohaus/daohaus-connect-feature';

import { BlockImageContainer, InfoSection } from './FormLayouts';
import hausBlock from '../assets/hausBlock.svg';

type LoadingProps = {
  txHash: string;
};

export const SummonerLoading = ({ txHash }: LoadingProps) => {
  return (
    <div className="main-column">
      <H1>
        <Bold>Summoning a Baal</Bold>
      </H1>
      <ParMd>
        Visit <TemporaryLink>Docs</TemporaryLink> for Help
      </ParMd>
      <BlockImageContainer>
        <div>
          <img src={hausBlock} alt="daohaus block pattern" />
        </div>
      </BlockImageContainer>
      <InfoSection>
        <ParMd className="info">DAO contract deployment in progress.</ParMd>
        <ExplorerLink address={txHash} type="tx">
          Watch Transaction
        </ExplorerLink>
      </InfoSection>
    </div>
  );
};
