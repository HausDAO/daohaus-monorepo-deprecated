import styled from 'styled-components';
import { Card, Theme, DataIndicator, widthQuery } from '@daohaus/ui';

import { TDao } from '@daohaus/dao-context';
import { charLimit, formatValueTo, fromWei } from '@daohaus/common-utilities';

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
};

export const MembersOverview = ({ dao }: MembersOverviewProps) => {
  return (
    <MembersOverviewCard>
      <DataGrid>
        <DataIndicator label="Members" data={dao.activeMemberCount} />
        <DataIndicator label="Shamans" data={dao.shamen?.length || '0'} />
        <DataIndicator
          label={charLimit(dao.shareTokenName, 12)}
          data={formatValueTo({
            value: fromWei(dao.totalShares),
            decimals: 2,
            format: 'numberShort',
          })}
        />
        <DataIndicator
          label={charLimit(dao.lootTokenName, 12)}
          data={formatValueTo({
            value: fromWei(dao.totalLoot),
            decimals: 2,
            format: 'numberShort',
          })}
        />
      </DataGrid>
    </MembersOverviewCard>
  );
};
