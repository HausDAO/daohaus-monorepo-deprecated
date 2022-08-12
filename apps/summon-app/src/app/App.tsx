import styled from 'styled-components';
import { useState } from 'react';

import { ParMd, Link } from '@daohaus/ui';
import { DaoHausNav, useHausConnect } from '@daohaus/daohaus-connect-feature';

import { TXBuilder } from '@daohaus/tx-builder-feature';
import { SummonerForm } from '../layouts/SummonerForm';
import { SummonerLoading } from '../layouts/SummonerLoading';
import hausCastle from '../assets/hausCastle.svg';
import { CenterLayout } from '../layouts/FormLayouts';
import { SummonerSuccess } from '../layouts/SummonerSuccess';
import { SummonError } from '../layouts/SummonError';

const TemporaryLayout = styled.div`
  width: 100%;
  padding-top: 2.7rem;
  padding: 4rem;
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

  const [summonState, setSummonState] = useState<SummonStates>('idle');
  const [txHash, setTxHash] = useState<string>('');
  const [daoAddress, setDaoAddress] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  return (
    <TXBuilder provider={provider} chainId={chainId} appState={{}}>
      <TemporaryLayout>
        <DaoHausNav />
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
        <footer>
          <div className="logo-box">
            <img src={hausCastle} alt="daohaus castle logo" />
            <ParMd>
              Built by{' '}
              <Link href="https://daohaus.club" linkType="external">
                DAOhaus
              </Link>
            </ParMd>
          </div>
        </footer>
      </TemporaryLayout>
    </TXBuilder>
  );
};

export default App;
