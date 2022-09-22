import styled from 'styled-components';

import {
  Card,
  DataIndicator,
  H4,
  SingleColumnLayout,
  widthQuery,
} from '@daohaus/ui';
import { useDao } from '@daohaus/dao-context';
import { DaoProfile } from '../components/DaoProfile';
import {
  charLimit,
  formatValueTo,
  fromWei,
  lowerCaseLootToken,
} from '@daohaus/common-utilities';

const OverviewCard = styled(Card)`
  width: 64rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

const TokensCard = styled(OverviewCard)`
  padding: 2.4rem;
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

export function DaoOverview() {
  const { dao } = useDao();

  return (
    <SingleColumnLayout>
      {dao && (
        <>
          <OverviewCard>
            <DaoProfile dao={dao} />
            <DataGrid>
              <DataIndicator
                label="Vault Total"
                data={formatValueTo({
                  value: dao.fiatTotal,
                  decimals: 2,
                  format: 'currencyShort',
                })}
              />
              <DataIndicator label="Members" data={dao.activeMemberCount} />
              <DataIndicator
                label="Active Proposals"
                data={dao.proposalCount}
              />
            </DataGrid>
          </OverviewCard>
          <TokensCard>
            <H4>Tokens</H4>
            <DataGrid>
              <DataIndicator
                label="Voting"
                data={charLimit(dao.shareTokenName, 8)}
              />
              <DataIndicator
                label="Supply"
                data={formatValueTo({
                  value: fromWei(dao.totalShares),
                  decimals: 2,
                  format: 'numberShort',
                })}
              />
              <DataIndicator label="Holders" data="--" />
              <DataIndicator
                label="Non-Voting"
                data={charLimit(lowerCaseLootToken(dao.lootTokenName), 8)}
              />
              <DataIndicator
                label="Supply"
                data={formatValueTo({
                  value: fromWei(dao.totalLoot),
                  decimals: 2,
                  format: 'numberShort',
                })}
              />
              <DataIndicator label="Holders" data="--" />
            </DataGrid>
          </TokensCard>
        </>
      )}
    </SingleColumnLayout>
  );
}

export default DaoOverview;
