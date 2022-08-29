import styled from 'styled-components';
import { Card, ParLg, ParSm, widthQuery } from '@daohaus/ui';

import { TProposals } from '../contexts/DaoContext';
import { ProposalCardOverview } from './ProposalCardOverview';

const ProposalCardContainer = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  width: 100%;
  margin-bottom: 3rem;
  border: none;
  height: 24.8rem;
  max-width: 100vw;
  @media ${widthQuery.sm} {
    flex-direction: column;
    height: 49.6rem;
    margin-bottom: 0;
  }
`;

const LeftCard = styled.div`
  width: 70%;
  @media ${widthQuery.sm} {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }
`;

const RightCard = styled.div`
  @media ${widthQuery.sm} {
    max-width: 100%;
    min-width: 0;
  }
`;

type BaseProposalCardProps = {
  proposal: TProposals[number];
};

export const BaseProposalCard = ({ proposal }: BaseProposalCardProps) => {
  return (
    <ProposalCardContainer>
      <LeftCard>
        <ProposalCardOverview proposal={proposal} />
      </LeftCard>
      <RightCard>
        <ParLg>actions</ParLg>
        <ParSm>status: {proposal.status}</ParSm>
      </RightCard>
    </ProposalCardContainer>
  );
};