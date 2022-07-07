import styled from 'styled-components';

import { charLimit, readableNumber } from '@daohaus/common-utilities';
import { Avatar, Bold, border, ParLg, ParMd } from '@daohaus/ui';
import { Tag } from './Tag';
import { AlertCircle } from './AlertCircle';
import { ITransformedMembership } from '@daohaus/dao-data';
import FallBackDAOImage from '../assets/fallback-dao-logo.svg';

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

export const DaoCard = ({
  isDelegate,
  dao,
  activeMemberCount,
  fiatTotal,
  activeProposalCount,
  totalProposalCount,
  votingPower,
  name,
  networkId,
  contractType,
}: ITransformedMembership) => {
  return (
    <StyledDaoCard className="dao-card">
      <div className="top-box">
        <div className="alert-box">
          <Avatar size="xl" src={FallBackDAOImage} />
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
        {activeMemberCount && (
          <ParMd>
            <Bold>{readableNumber({ amount: activeMemberCount })}</Bold> Members
          </ParMd>
        )}
        {fiatTotal != null && (
          <ParMd>
            {/* <Bold>{toDollars(fiatTotal)}</Bold> */}
            <Bold>{readableNumber({ amount: fiatTotal, unit: 'USD' })}</Bold>
          </ParMd>
        )}
        {totalProposalCount && (
          <ParMd>
            <Bold>{readableNumber({ amount: totalProposalCount })}</Bold>{' '}
            Proposals
          </ParMd>
        )}
        {votingPower && (
          <ParMd>
            <Bold>
              {readableNumber({
                amount: votingPower,
                unit: '%',
                separator: '',
                maxDecimals: 2,
              })}
            </Bold>{' '}
            Voting Power
          </ParMd>
        )}
      </div>
      <div className="tag-box">
        <Tag>{networkId}</Tag>
        <Tag>{contractType}</Tag>
      </div>
    </StyledDaoCard>
  );
};
