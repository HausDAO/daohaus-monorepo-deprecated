import styled from 'styled-components';

import { BiColumnLayout, Card, widthQuery } from '@daohaus/ui';
import { HausLayout } from '@daohaus/daohaus-connect-feature';

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

export function App() {
  return (
    <HausLayout
      navLinks={[
        { label: 'Home', href: '/home' },
        { label: 'Proposals', href: '/proposals' },
        { label: 'Vaults', href: '/vaults' },
        { label: 'Members', href: '/members' },
      ]}
      moreLinks={[{ label: 'Settings', href: '/settings' }]}
    >
      <BiColumnLayout
        subtitle="Disperse Proposal"
        title="Disperse Reimbursements for April ‘22 Event"
        left={<LeftCard>Left</LeftCard>}
        right={<RightCard>Right</RightCard>}
      />
    </HausLayout>
  );
}

export default App;
