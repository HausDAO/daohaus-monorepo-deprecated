import styled from 'styled-components';

import { Card, FormLayout } from '@daohaus/ui';
import { HausLayout } from '@daohaus/daohaus-connect-feature';

const Spacer = styled.div`
  width: 100%;
  height: 50rem;
`;

export function Home() {
  return (
    <HausLayout>
      <FormLayout
        title="No DAO"
        description="you need a better url"
        subtitle="Something nicer"
      >
        <Card>
          <Spacer />
        </Card>
      </FormLayout>
    </HausLayout>
  );
}

export default Home;
