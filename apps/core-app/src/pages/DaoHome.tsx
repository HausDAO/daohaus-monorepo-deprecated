import styled from 'styled-components';

import { BiColumnLayout, Card, FormLayout, widthQuery } from '@daohaus/ui';
import { HausLayout } from '@daohaus/daohaus-connect-feature';
import Layout from '../components/Layout';

const LeftCard = styled(Card)`
  width: 100%;
  min-width: 54rem;
  max-width: 64rem;
  height: 47rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

const RightCard = styled(Card)`
  width: 100%;
  min-width: 38rem;
  max-width: 45rem;
  height: 77rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

const Spacer = styled.div`
  width: 100%;
  height: 50rem;
`;

export function DaoHome() {
  return (
    <Layout>
      <FormLayout
        title="Title"
        description="this is a nice long description where I talk about things"
        subtitle="Something nicer"
      >
        <Card>
          <Spacer />
        </Card>
      </FormLayout>
    </Layout>
  );
}

export default DaoHome;
