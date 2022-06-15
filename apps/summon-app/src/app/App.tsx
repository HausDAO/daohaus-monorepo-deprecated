import styled from 'styled-components';

import { DaoHausNav, useHausConnect } from '@daohaus/daohaus-connect-feature';
import { SummonerForm } from '../layouts/SummonerForm';
import { TXBuilder } from './TXBuilder';
import { ChainId } from 'caip';

const TemporaryLayout = styled.div`
  width: 100%;
  padding-top: 2.7rem;
  padding-right: 4rem;
`;

export const App = () => {
  const { provider, chainId } = useHausConnect();
  return (
    <TXBuilder provider={provider} chainId={chainId}>
      <TemporaryLayout>
        <DaoHausNav />
        <SummonerForm />
      </TemporaryLayout>
    </TXBuilder>
  );
};

export default App;
