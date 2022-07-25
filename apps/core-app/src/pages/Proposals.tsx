import styled from 'styled-components';

import { BiColumnLayout, Card, widthQuery } from '@daohaus/ui';
import { useProposals } from '../contexts/DaoContext';

const LeftCard = styled(Card)`
  width: 100%;
  min-width: 54rem;
  max-width: 64rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export function Proposals() {
  const { proposals } = useProposals();

  return (
    <BiColumnLayout
      subtitle="DAO"
      title="Proposals"
      left={<LeftCard>{JSON.stringify(proposals, null, 2)}</LeftCard>}
      right={null}
    />
  );
}

export default Proposals;
