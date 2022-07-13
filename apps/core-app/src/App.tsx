import { DaoHausNav } from '@daohaus/daohaus-connect-feature';
import { H1, widthQuery } from '@daohaus/ui';
import styled from 'styled-components';

const Layout = styled.div`
  width: 100%;
  .connect {
    padding: 2.6rem 3rem;
  }
  @media ${widthQuery.sm} {
    .connect {
      padding: 3rem 2rem;
    }
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
