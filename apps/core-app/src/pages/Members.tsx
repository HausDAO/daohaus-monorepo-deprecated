import styled from 'styled-components';

import { BiColumnLayout, Card, widthQuery } from '@daohaus/ui';
import { useDao } from '../contexts/DaoContext';

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

export function Members() {
  const { dao } = useDao();

  console.log('dao', dao);

  return (
    <BiColumnLayout
      subtitle="MEMBERS"
      title="membering"
      left={<LeftCard>Left</LeftCard>}
      right={<RightCard>Right</RightCard>}
    />
  );
}

export default Members;
