import styled from 'styled-components';

import { charLimit } from '@daohaus/common-utilities';
import { Avatar, Bold, border, Button, ParLg, ParMd } from '@daohaus/ui';
import { Tag } from './Tag';
import { AlertCircle } from './AlertCircle';
import { TransformedMembership } from '@daohaus/dao-data';

const StyledDaoCard = styled.div`
  background-color: ${(props) => props.theme.card.bg};
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 36rem;
  min-width: 26rem;
  border: 1px solid ${(props) => props.theme.card.border};
  padding: 2.4rem;
  border-radius: ${border.radius};
  .top-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.3rem;
  }
  .alert-box {
    position: relative;
  }
  .stats-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 2.4rem;
    p {
      margin-bottom: 0.6rem;
    }
  }
  .tag-box {
    margin-bottom: 2.4rem;
    p {
      margin-right: 1.5rem;
    }
  }
  .dao-title {
    font-weight: 700;
    margin-bottom: 1.9rem;
  }
`;

// COMPONENT LIBRARY
// Calling this AlertCircle. It's the circle that alerts
// about the DAO's proposal status.

export const DaoCard = ({
  isDelegate,
  dao,
  activeMemberCount,
  fiatTotal,
  activeProposalCount,
  // totalProposals,
  votingPower,
  name,
  networkId,
}: // contractName,
TransformedMembership) => {
  return (
    <StyledDaoCard className="dao-card">
      <div className="top-box">
        <div className="alert-box">
          <Avatar size="xl" />
          {activeProposalCount > 0 && (
            <AlertCircle number={activeProposalCount} />
          )}
        </div>
        {isDelegate && <Tag>Delegate</Tag>}
      </div>
      <ParLg className="dao-title">
        {name ? charLimit(name, 21) : charLimit(dao, 21)}{' '}
      </ParLg>
      <div className="stats-box">
        <ParMd>
          <Bold>{activeMemberCount}</Bold> Members
        </ParMd>
        <ParMd>
          <Bold>{fiatTotal}</Bold> USD
        </ParMd>
        {/* <ParMd>
          <Bold>{totalProposals}</Bold> Proposals
        </ParMd> */}
        <ParMd>
          <Bold>{votingPower}</Bold>% Voting Power
        </ParMd>
      </div>
      <div className="tag-box">
        <Tag>{networkId}</Tag>
        <Tag>Moloch V3</Tag>
      </div>
      <div>
        <Button secondary>Go</Button>
      </div>
    </StyledDaoCard>
  );
};
