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

export function DaoOverview() {
  const { dao } = useDao();

  return (
    <BiColumnLayout
      subtitle="DAO"
      title="Overview"
      left={<LeftCard>{JSON.stringify(dao, null, 2)}</LeftCard>}
      right={null}
    />
  );
}

export default DaoOverview;
