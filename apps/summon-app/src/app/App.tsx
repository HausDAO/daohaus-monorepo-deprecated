import styled from 'styled-components';
import { useState } from 'react';

import { Banner, AppSwitcher, Footer } from '@daohaus/ui';
import { DaoHausNav, useHausConnect } from '@daohaus/daohaus-connect-feature';

import { TXBuilder } from '@daohaus/tx-builder-feature';
import { SummonerForm } from '../layouts/SummonerForm';
import { SummonerLoading } from '../layouts/SummonerLoading';
import { CenterLayout } from '../layouts/FormLayouts';
import { SummonerSuccess } from '../layouts/SummonerSuccess';
import { SummonError } from '../layouts/SummonError';

const TemporaryLayout = styled.div`
  width: 100%;
  padding-top: 2.7rem;
  padding: 4rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
`;

export type SummonStates = 'idle' | 'loading' | 'success' | 'error';
export const App = () => {
  const { provider, chainId } = useHausConnect();

  const [summonState, setSummonState] = useState<SummonStates>('idle');
  const [txHash, setTxHash] = useState<string>('');
  const [daoAddress, setDaoAddress] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  const apps = {
    trigger: {
      name: 'Summoner',
      url: 'https://summon.daohaus.fun/',
    },
    apps: [
      {
        name: 'Hub',
        url: 'https://hub.daohaus.fun/',
      },
      {
        name: 'Docs',
        url: 'https://storybook.daohaus.fun/',
      },
    ],
  };

  return (
    <TXBuilder provider={provider} chainId={chainId} appState={{}}>
      <Banner />
      <TemporaryLayout>
        <Header>
          <AppSwitcher {...apps} />;
          <DaoHausNav />
        </Header>
        <CenterLayout>
          {summonState === 'idle' && (
            <SummonerForm
              setSummonState={setSummonState}
              setTxHash={setTxHash}
              setDaoAddress={setDaoAddress}
              setErrMsg={setErrMsg}
            />
          )}
          {summonState === 'loading' && <SummonerLoading txHash={txHash} />}
          {summonState === 'success' && (
            <SummonerSuccess
              chainId={chainId}
              daoAddress={daoAddress}
              setSummonState={setSummonState}
            />
          )}
          {summonState === 'error' && (
            <SummonError
              errMsg={errMsg}
              setSummonState={setSummonState}
              daoAddress={daoAddress}
            />
          )}
        </CenterLayout>
        <Footer />
      </TemporaryLayout>
    </TXBuilder>
  );
};

export default App;
