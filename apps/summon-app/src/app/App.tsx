import styled from 'styled-components';

import { DaoHausNav } from '@daohaus/daohaus-connect-feature';
import { SummonerForm } from '../layouts/SummonerForm';

const TemporaryLayout = styled.div`
  width: 100%;
  padding-top: 2.7rem;
  padding-right: 4rem;
`;

export const App = () => {
  return (
    <TemporaryLayout>
      <DaoHausNav />
      <SummonerForm />
    </TemporaryLayout>
  );
};

export default App;
