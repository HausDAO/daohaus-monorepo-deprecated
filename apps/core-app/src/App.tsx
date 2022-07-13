import { DaoHausNav } from '@daohaus/daohaus-connect-feature';
import { H1 } from '@daohaus/ui';
import styled from 'styled-components';

const Layout = styled.div`
  width: 100%;
  .connect {
    padding: 2.6rem 3rem;
  }
`;

export function App() {
  return (
    <Layout>
      <DaoHausNav />
      <H1>Header!</H1>
    </Layout>
  );
}

export default App;
