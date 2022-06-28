import React from 'react';

import styled from 'styled-components';

import { charLimit } from '@daohaus/common-utilities';
import { Avatar, Bold, Button, ParLg, ParMd } from '@daohaus/ui';
import { Tag } from './Tag';
import { AlertCircle } from './AlertCircle';

const StyledDaoCard = styled.div`
  background-color: ${(props) => props.theme.card.bg};
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 36rem;
  min-width: 28rem;
  border: 1px solid ${(props) => props.theme.card.border};
  padding: 2.4rem;
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

type DaoCardProps = {
  isDelegate: boolean;
  unreadProposalAmt: number;
  daoName: string;
  amtMembers: number;
  amtToken: number;
  tokenSymbol: string;
  amtProposals: number;
  amtPower: number;
  networkName: string;
  contractName: string;
};

export const DaoCard = ({
  isDelegate,
  unreadProposalAmt,
  daoName,
  amtMembers,
  amtToken,
  amtProposals,
  amtPower,
  tokenSymbol,
  networkName,
  contractName,
}: DaoCardProps) => {
  return (
    <StyledDaoCard>
      <div className="top-box">
        <div className="alert-box">
          <Avatar size="xl" />
          {unreadProposalAmt > 0 && <AlertCircle number={unreadProposalAmt} />}
        </div>
        {isDelegate && <Tag>Delegate</Tag>}
      </div>
      <ParLg className="dao-title">{charLimit(daoName, 21)} </ParLg>
      <div className="stats-box">
        <ParMd>
          <Bold>{amtMembers}</Bold> Members
        </ParMd>
        <ParMd>
          <Bold>{amtToken}</Bold> {tokenSymbol}
        </ParMd>
        <ParMd>
          <Bold>{amtProposals}</Bold> Proposals
        </ParMd>
        <ParMd>
          <Bold>{amtPower}</Bold> Power
        </ParMd>
      </div>
      <div className="tag-box">
        <Tag>{networkName}</Tag>
        <Tag>{contractName}</Tag>
      </div>
      <div>
        <Button secondary>Go</Button>
      </div>
    </StyledDaoCard>
  );
};
