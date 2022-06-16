import styled from 'styled-components';

import {
  DaoHausNav,
  ExplorerLink,
  useHausConnect,
} from '@daohaus/daohaus-connect-feature';
import { SummonerForm } from '../layouts/SummonerForm';
import { TXBuilder } from './TXBuilder';

import { useState } from 'react';
import { SummonerLoading } from '../layouts/SummonerLoading';
import hausCastle from '../assets/hausCastle.svg';
import { CenterLayout } from '../layouts/FormLayouts';
import { ParMd, TemporaryLink } from '@daohaus/ui';

const TemporaryLayout = styled.div`
  width: 100%;
  padding-top: 2.7rem;
  padding-right: 4rem;
  footer {
    margin-top: 17rem;
    padding-bottom: 5rem;
    display: flex;
    justify-content: center;
    .logo-box {
      display: flex;
      align-items: center;
      img {
        margin-right: 1.8rem;
      }
    }
  }
`;

export type SummonStates = 'idle' | 'loading' | 'success' | 'error';
export const App = () => {
  const { provider, chainId } = useHausConnect();

  const [summonState, setSummonState] = useState<SummonStates>('loading');
  const [txHash, setTxHash] = useState<string>('');

  return (
    <TXBuilder provider={provider} chainId={chainId}>
      <TemporaryLayout>
        <DaoHausNav />
        <CenterLayout>
          {summonState === 'idle' && (
            <SummonerForm
              setSummonState={setSummonState}
              setTxHash={setTxHash}
            />
          )}
          {summonState === 'loading' && <SummonerLoading txHash={txHash} />}
          {/* {summonState === 'success' && } */}
          {/* {summonState === 'error' && } */}
        </CenterLayout>
        <footer>
          <div className="logo-box">
            <img src={hausCastle} alt="daohaus castle logo" />
            <ParMd>
              Built by{' '}
              <TemporaryLink href="https://daohaus.club">DAOhaus</TemporaryLink>
            </ParMd>
          </div>
        </footer>
      </TemporaryLayout>
    </TXBuilder>
  );
};

export default App;
