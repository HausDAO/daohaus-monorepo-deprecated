import styled from 'styled-components';

import { DaoHausNav, useHausConnect } from '@daohaus/daohaus-connect-feature';
import { SummonerForm } from '../layouts/SummonerForm';
import { TXBuilder } from './TXBuilder';
import { ChainId } from 'caip';
import { useState } from 'react';

const TemporaryLayout = styled.div`
  width: 100%;
  padding-top: 2.7rem;
  padding-right: 4rem;
`;
export type SummonStates = 'idle' | 'loading' | 'success' | 'error';
export const App = () => {
  const { provider, chainId } = useHausConnect();

  const [summonState, setSummonState] = useState<SummonStates>('idle');
  const [txHash, setTxHash] = useState<string>('');

  return (
    <TXBuilder provider={provider} chainId={chainId}>
      <TemporaryLayout>
        <DaoHausNav />
        {summonState === 'idle' && (
          <SummonerForm setSummonState={setSummonState} setTxHash={setTxHash} />
        )}
        {summonState === 'loading' && (
          <SummonerLoading setSummonState={setSummonState} txHash={txHash} />
        )}
        {/* {summonState === 'success' && } */}
        {/* {summonState === 'error' && } */}
      </TemporaryLayout>
    </TXBuilder>
  );
};

export default App;
