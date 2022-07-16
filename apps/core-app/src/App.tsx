import { DaoHausNav } from '@daohaus/daohaus-connect-feature';
import { BiColumnLayout, Card, Main, SubNav } from '@daohaus/ui';
import { OuterLayout } from '@daohaus/ui';
import styled from 'styled-components';

const LeftCard = styled(Card)`
  /* min-width: 58rem; */
  /* display: flex; */
  width: 100%;
  min-width: 54rem;
  max-width: 64rem;
  height: 47rem;
`;

const RightCard = styled(Card)`
  width: 100%;
  min-width: 38rem;
  max-width: 45rem;
  height: 77rem;
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
        <BiColumnLayout
          subtitle="Disperse Proposal"
          title="Disperse Reimbursements for April ‘22 Event"
          left={<LeftCard>Left</LeftCard>}
          right={<RightCard>Right</RightCard>}
        />
      </Main>
    </OuterLayout>
  );
}

export default App;
