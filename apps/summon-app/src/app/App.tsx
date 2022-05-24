import { DaoHausNav } from '@daohaus/daohaus-connect-feature';
import { H2, Input, ParMd } from '@daohaus/ui';
import styled from 'styled-components';

const TemporaryLayout = styled.div`
  width: 100%;
  padding-top: 2.7rem;
  padding-right: 4rem;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  .form-column {
    width: 52rem;
    height: 2rem;
  }
  .title-section {
    margin-bottom: 16rem;
  }
`;

export function App() {
  return (
    <TemporaryLayout>
      <DaoHausNav />
      <Main>
        <div className="form-column">
          <div className="title-section">
            <H2>Summon a Baal.</H2>
            <ParMd>Visit Docs for Help</ParMd>
          </div>
          <div>
            <Input id="daoName" full placeholder="Braid Guild" />
          </div>
        </div>
      </Main>
    </TemporaryLayout>
  );
}

export default App;
