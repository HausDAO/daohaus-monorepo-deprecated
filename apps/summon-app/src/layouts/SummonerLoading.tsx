import { ExplorerLink } from '@daohaus/daohaus-connect-feature';
import { Bold, H1, ParMd, TemporaryLink } from '@daohaus/ui';
import React from 'react';
import { CenterLayout } from './primitives';

type LoadingProps = {
  txHash: string;
};

export const SummonerLoading = ({ txHash }: LoadingProps) => {
  return (
    <CenterLayout>
      <div className="main-column">
        <H1>
          <Bold>Summoning a Baal</Bold>
        </H1>
        <ParMd>
          Visit <TemporaryLink>Docs</TemporaryLink> for Help
        </ParMd>
        <ParMd>DAO contract deployment in progress.</ParMd>
        <ExplorerLink>Watch Transaction</ExplorerLink>
      </div>
    </CenterLayout>
  );
};
