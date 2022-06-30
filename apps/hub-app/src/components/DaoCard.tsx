import styled from 'styled-components';

import { charLimit } from '@daohaus/common-utilities';
import { Avatar, Bold, border, Button, ParLg, ParMd } from '@daohaus/ui';
import { Tag } from './Tag';
import { AlertCircle } from './AlertCircle';
import { TemporaryDAOType } from '../utils/appSpecificTypes';

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
  daoName,
  members,
  vaults,
  activeProposals,
  totalProposals,
  power,
  tokenSymbol,
  network,
  contractName,
}: TemporaryDAOType) => {
  return (
    <StyledDaoCard className="dao-card">
      <div className="top-box">
        <div className="alert-box">
          <Avatar size="xl" />
          {activeProposals > 0 && <AlertCircle number={activeProposals} />}
        </div>
        {isDelegate && <Tag>Delegate</Tag>}
      </div>
      <ParLg className="dao-title">{charLimit(daoName, 21)} </ParLg>
      <div className="stats-box">
        <ParMd>
          <Bold>{members}</Bold> Members
        </ParMd>
        <ParMd>
          <Bold>{vaults}</Bold> {tokenSymbol}
        </ParMd>
        <ParMd>
          <Bold>{totalProposals}</Bold> Proposals
        </ParMd>
        <ParMd>
          <Bold>{power}</Bold> Power
        </ParMd>
      </div>
      <div className="tag-box">
        <Tag>{network}</Tag>
        <Tag>{contractName}</Tag>
      </div>
      <div>
        <Button secondary>Go</Button>
      </div>
    </StyledDaoCard>
  );
};
