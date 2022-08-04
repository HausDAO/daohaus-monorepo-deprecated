import styled from 'styled-components';
import { H3, H4, DataIndicator, ParSm, widthQuery, Theme } from '@daohaus/ui';

import { TDao } from '../contexts/DaoContext';
import {
  formatPeriods,
  formatValueTo,
  fromWei,
  getNetwork,
  INFO_COPY,
} from '@daohaus/common-utilities';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

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
  const { daochain } = useParams();
  const networkData = useMemo(() => {
    if (!daochain) return null;
    return getNetwork(daochain);
  }, [daochain]);

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
          data={formatPeriods(dao.votingPeriod)}
          info={INFO_COPY.VOTING_PERIOD}
        />
        <DataIndicator
          size="sm"
          label="Grace Period"
          data={formatPeriods(dao.gracePeriod)}
          info={INFO_COPY.GRACE_PERIOD}
        />
        <DataIndicator
          size="sm"
          label="New Offering"
          data={`${dao.proposalOffering} ${networkData?.symbol}`}
          info={INFO_COPY.NEW_OFFERING}
        />
      </DataGrid>
      <DataGrid>
        <DataIndicator
          size="sm"
          label="Quorum %"
          data={formatValueTo({ value: dao.quorumPercent, format: 'percent' })}
          info={INFO_COPY.QUORUM}
        />
        <DataIndicator
          size="sm"
          label="Min Retention %"
          data={formatValueTo({
            value: dao.minRetentionPercent,
            format: 'percent',
          })}
          info={INFO_COPY.MIN_RETENTION}
        />
        <DataIndicator
          size="sm"
          label="Sponsor Threshold"
          data={`${dao.sponsorThreshold} Shares`}
          info={INFO_COPY.SPONSOR_THRESHOLD}
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
