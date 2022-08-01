import styled from 'styled-components';

import { Card, SingleColumnLayout, widthQuery } from '@daohaus/ui';
import { useDao } from '../contexts/DaoContext';
import { DaoProfile } from '../components/DaoProfile/DaoProfile';

const OverviewCard = styled(Card)`
  width: 64rem;
  padding: 2rem;
  border: none;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export function DaoOverview() {
  const { dao } = useDao();

  return (
    <SingleColumnLayout>
      <OverviewCard>{dao && <DaoProfile dao={dao} />}</OverviewCard>
    </SingleColumnLayout>
  );
}

export default DaoOverview;
