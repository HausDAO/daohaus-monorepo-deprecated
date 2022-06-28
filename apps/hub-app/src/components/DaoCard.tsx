import { charLimit } from '@daohaus/common-utilities';
import { Avatar, border, H1, ParLg, ParMd, ParSm } from '@daohaus/ui';
import { blueDark } from '@radix-ui/colors';
import React from 'react';
import styled from 'styled-components';

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
`;

// COMPONMENT LIBRARY
// TAGS are going to need their own component and system for coloring them
const Tag = styled(ParSm)`
  display: flex;
  height: fit-content;
  padding: 0.2rem.5rem;
  // REVIEW TEMPRORARY COLORS UNTIL WE MAKE TAG SYSTEM
  background-color: ${blueDark.blue3};
  color: ${blueDark.blue11};
  border-radius: ${border.radius};
`;

// COMPONENT LIBRARY
// Calling this AlertCircle. It's the circle that alerts
// about the DAO's proposal status.
const AlertBox = styled.div`
  position: absolute;
  top: 0;
  right: -1.2rem;
  border-radius: 100px;
  height: 3.6rem;
  width: 3.6rem;
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: center;
  // REVIEW TEMPRORARY COLORS UNTIL WE MAKE CIRCLE SYSTEM
  background-color: ${blueDark.blue6};
  p {
    font-weight: 700;
  }
`;

type DaoCardProps = {
  isDelegate: boolean;
  unreadProposalAmt: number;
};

const DAOCardTitle = styled(ParLg)`
  font-weight: 900;
`;

export const DaoCard = ({ isDelegate, unreadProposalAmt }: DaoCardProps) => {
  return (
    <StyledDaoCard>
      <div className="top-box">
        <div className="alert-box">
          <Avatar size="xl" />
          {unreadProposalAmt > 0 && <AlertCircle number={unreadProposalAmt} />}
        </div>
        {isDelegate && <Tag>Delegate</Tag>}
      </div>
      <DAOCardTitle>
        {charLimit('Uber Complex Meta Governance', 21)}{' '}
      </DAOCardTitle>
    </StyledDaoCard>
  );
};

type AlertCircleProps = {
  number: number;
};
export const AlertCircle = ({ number }: AlertCircleProps) => {
  return (
    <AlertBox>
      <ParMd>{number}</ParMd>
    </AlertBox>
  );
};
