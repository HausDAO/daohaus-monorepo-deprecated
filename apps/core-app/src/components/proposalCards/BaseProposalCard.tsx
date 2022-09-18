import styled from 'styled-components';
import { Card, widthQuery } from '@daohaus/ui';

import { ProposalCardOverview } from '../ProposalCardOverview';
import { ProposalActions } from './ProposalActions';
import { ITransformedProposal } from '@daohaus/dao-data';

const ProposalCardContainer = styled(Card)`
  display: flex;
  gap: 3rem;
  width: 100%;

  margin-bottom: 3rem;
  padding: 2.3rem 2.5rem;
  border: none;
  height: 23.8rem;
  @media ${widthQuery.sm} {
    gap: 2rem;
    flex-direction: column;
    height: auto;
    margin-bottom: 2rem;
  }
`;

const LeftCard = styled.div`
  width: 100%;
  @media ${widthQuery.sm} {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }
`;

const RightCard = styled.div`
  min-width: 26rem;
  @media ${widthQuery.sm} {
    max-width: 100%;
    min-width: 0;
  }
`;

type BaseProposalCardProps = {
  proposal: ITransformedProposal;
};

export const BaseProposalCard = ({ proposal }: BaseProposalCardProps) => {
  return (
    <ProposalCardContainer>
      <LeftCard>
        <ProposalCardOverview proposal={proposal} />
      </LeftCard>
      <RightCard>
        <ProposalActions proposal={proposal} />
      </RightCard>
    </ProposalCardContainer>
  );
};
