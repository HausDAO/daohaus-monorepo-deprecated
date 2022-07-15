import { DaoHausNav } from '@daohaus/daohaus-connect-feature';
import { Card, FormLayout, Main, SubNav } from '@daohaus/ui';
import { OuterLayout } from '@daohaus/ui';
import styled from 'styled-components';

const Spacer = styled.div`
  width: 100%;
  height: 50rem;
`;

export function App() {
  return (
    <OuterLayout>
      <DaoHausNav />
      <SubNav
        navLinks={[
          { label: 'Home', href: '/home' },
          { label: 'Proposals', href: '/proposals' },
          { label: 'Vaults', href: '/vaults' },
          { label: 'Members', href: '/members' },
        ]}
        moreLinks={[{ label: 'Settings', href: '/settings' }]}
      />
      <Main>
        <FormLayout
          subtitle="Shaman Proposal"
          title="Manage or Add a Shaman"
          description="Learn more about Shamans in our documentation. "
        >
          <Card>
            <Spacer />
          </Card>
        </FormLayout>
      </Main>
    </OuterLayout>
  );
}

export default App;
