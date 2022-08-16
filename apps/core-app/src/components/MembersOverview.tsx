import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  AddressDisplay,
  Card,
  H4,
  Link,
  ParXs,
  Theme,
  Bold,
  DataIndicator,
  widthQuery,
} from '@daohaus/ui';
import {
  formatValueTo,
  generateGnosisUiLink,
  Keychain,
} from '@daohaus/common-utilities';

import { TDao, TMembers } from '../contexts/DaoContext';

const MembersOverviewCard = styled(Card)`
  background-color: ${({ theme }: { theme: Theme }) => theme.card.hoverBg};
  border: none;
  padding: 3rem;
`;

const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  div {
    padding: 2rem 0;
    width: 19.7rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
`;

type MembersOverviewProps = {
  dao: TDao;
  members: TMembers;
};

export const MembersOverview = ({ dao, members }: MembersOverviewProps) => {
  const { daoid, daochain } = useParams();

  // console.log('dao', dao);

  return (
    <MembersOverviewCard>
      <DataGrid>
        <DataIndicator label="Members" data={dao.activeMemberCount} />
        <DataIndicator label="Shamans" data={dao.shamen?.length || '0'} />
        <DataIndicator label="shares" data={'0'} />
        <DataIndicator label="loot" data={'0'} />
      </DataGrid>
    </MembersOverviewCard>
  );
};
