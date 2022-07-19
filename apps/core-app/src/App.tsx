import styled from 'styled-components';

import { Card, FormLayout } from '@daohaus/ui';
import { HausLayout } from '@daohaus/daohaus-connect-feature';

// const LeftCard = styled(Card)`
//   width: 100%;
//   min-width: 54rem;
//   max-width: 64rem;
//   height: 47rem;
//   @media ${widthQuery.md} {
//     max-width: 100%;
//     min-width: 0;
//   }
// `;

// const RightCard = styled(Card)`
//   width: 100%;
//   min-width: 38rem;
//   max-width: 45rem;
//   height: 77rem;
//   @media ${widthQuery.md} {
//     max-width: 100%;
//     min-width: 0;
//   }
// `;

const Spacer = styled.div`
  width: 100%;
  height: 50rem;
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
      dropdownLinks={[{ label: 'Settings', href: '/settings' }]}
    >
      <FormLayout
        title="Title"
        description="this is a nice long description where I talk about things"
        subtitle="Something nicer"
      >
        <Card>
          <Spacer />
        </Card>
      </FormLayout>
      {/* <BiColumnLayout
        subtitle="Disperse Proposal"
        title="Disperse Reimbursements for April ‘22 Event"
        left={<LeftCard>Left</LeftCard>}
        right={<RightCard>Right</RightCard>}
      /> */}
    </HausLayout>
  );
}

export default App;
