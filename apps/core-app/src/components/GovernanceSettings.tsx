import styled from 'styled-components';
import { H3, H4, DataIndicator, ParSm, widthQuery, Theme } from '@daohaus/ui';

import { TDao } from '../contexts/DaoContext';
import { formatValueTo, fromWei } from '@daohaus/common-utilities';

const GovernanceContainer = styled.div`
  .tokens {
    margin-top: 3rem;
  }
  h4 {
    margin-top: 4rem;
  }
`;

// putting this in place for when we bring in the action button
const GovernanceCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  div {
    margin-top: 3rem;
    width: 34rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
`;

const TokenDataGrid = styled(DataGrid)`
  div {
    width: 22.7rem;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }: { theme: Theme }) => theme.link.color};
`;

type GovernanceSettingsProps = {
  dao: TDao;
};

export const GovernanceSettings = ({ dao }: GovernanceSettingsProps) => {
  return (
    <GovernanceContainer>
      <GovernanceCardHeader>
        <H3>Governance</H3>
      </GovernanceCardHeader>
      <div className="description">
        <ParSm>
          <StyledLink
            href="https://baal-docs.vercel.app/configuration/governance-configuration"
            target="_blank"
            rel="noreferrer"
          >
            Review the documenation
          </StyledLink>{' '}
          for additional details on governance settings. Updates to settings
          will go through a proposal.
        </ParSm>
      </div>
      <DataGrid>
        <DataIndicator
          size="sm"
          label="Voting Period"
          data={dao.votingPeriod}
          info={'something'}
        />
        <DataIndicator
          size="sm"
          label="Grace Period"
          data={dao.gracePeriod}
          info={'something'}
        />
        <DataIndicator
          size="sm"
          label="New Offering"
          data={dao.proposalOffering}
          info={'something'}
        />
      </DataGrid>
      <DataGrid>
        <DataIndicator
          size="sm"
          label="Quorum %"
          data={dao.quorumPercent}
          info={'something'}
        />
        <DataIndicator
          size="sm"
          label="Min Retention %"
          data={dao.minRetentionPercent}
          info={'something'}
        />
        <DataIndicator
          size="sm"
          label="Sponsor Threshold"
          data={dao.sponsorThreshold}
          info={'something'}
        />
      </DataGrid>
      <H3 className="tokens">DAO Tokens</H3>
      <H4>Voting</H4>
      <TokenDataGrid>
        <DataIndicator
          size="sm"
          label="total"
          data={formatValueTo({
            value: fromWei(dao.totalShares),
            decimals: 2,
            format: 'number',
          })}
        />
        <DataIndicator size="sm" label="Symbol" data={dao.shareTokenSymbol} />
        <DataIndicator size="sm" label="Name" data={dao.shareTokenName} />
        <DataIndicator
          size="sm"
          label="Transferability"
          data={dao.sharesPaused ? 'Off' : 'On'}
        />
      </TokenDataGrid>
      <H4>Non-Voting</H4>
      <TokenDataGrid>
        <DataIndicator
          size="sm"
          label="total"
          data={formatValueTo({
            value: fromWei(dao.totalLoot),
            decimals: 2,
            format: 'number',
          })}
        />
        <DataIndicator size="sm" label="Symbol" data={dao.lootTokenSymbol} />
        <DataIndicator size="sm" label="Name" data={dao.lootTokenName} />
        <DataIndicator
          size="sm"
          label="Transferability"
          data={dao.lootPaused ? 'Off' : 'On'}
        />
      </TokenDataGrid>
    </GovernanceContainer>
  );
};
