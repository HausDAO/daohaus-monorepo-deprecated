import styled from 'styled-components';

import { BiColumnLayout, Card, widthQuery } from '@daohaus/ui';
import { useMembers } from '../contexts/DaoContext';

const LeftCard = styled(Card)`
  width: 100%;
  min-width: 54rem;
  max-width: 64rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export function Members() {
  const { members } = useMembers();

  return (
    <BiColumnLayout
      subtitle="DAO"
      title="Members"
      left={<LeftCard>{JSON.stringify(members, null, 2)}</LeftCard>}
      right={null}
    />
  );
}

export default Members;
