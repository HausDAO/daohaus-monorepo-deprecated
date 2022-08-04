import styled from 'styled-components';

import { charLimit, readableNumbers } from '@daohaus/common-utilities';
import { Bold, border, Button, ParLg, ParMd, ProfileAvatar } from '@daohaus/ui';
import { Tag } from './Tag';
import { AlertCircle } from './AlertCircle';
import { ITransformedMembership } from '@daohaus/dao-data';

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

const StyledButton = styled(Button)`
  justify-content: center;
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
          <ProfileAvatar size="xl" address={dao} />
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
            <Bold>
              {readableNumbers.toNumber({ value: activeMemberCount })}
            </Bold>{' '}
            Members
          </ParMd>
        )}
        {fiatTotal != null && (
          <ParMd>
            <Bold>
              {readableNumbers.toDollars({
                value: fiatTotal,
                unit: 'USD',
                separator: ' ',
              })}
            </Bold>
          </ParMd>
        )}
        {totalProposalCount && (
          <ParMd>
            <Bold>
              {readableNumbers.toNumber({ value: totalProposalCount })}
            </Bold>{' '}
            Proposals
          </ParMd>
        )}
        {votingPower > 0 ? (
          <ParMd>
            <Bold>
              {readableNumbers.toPercentDecimals({
                value: votingPower,
                separator: '',
              })}
            </Bold>{' '}
            Voting Power
          </ParMd>
        ) : (
          <ParMd>No Voting Power</ParMd>
        )}
      </div>
      <div className="tag-box">
        <Tag>{networkId}</Tag>
        <Tag>{contractType}</Tag>
      </div>
      <a
        href={`https://admin.daohaus.fun/#/molochv3/${networkId}/${dao}`}
        target="_blank"
        rel="noreferrer"
      >
        <StyledButton secondary>Go</StyledButton>
      </a>
    </StyledDaoCard>
  );
};
