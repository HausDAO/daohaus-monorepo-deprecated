import { ITransformedProposal } from '@daohaus/dao-data';
import { ParLg } from '@daohaus/ui';
import styled from 'styled-components';
import { Unsponsored } from './Unsponsored';
import { VotingPeriod } from './VotingPeriod';

const ActionBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 31rem;
`;

export const ProposalActions = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
  if (proposal.status === 'Unsponsored') {
    return (
      <ActionBox>
        <Unsponsored proposal={proposal} />
      </ActionBox>
    );
  }
  if (proposal.status === 'Voting') {
    return (
      <ActionBox>
        <VotingPeriod proposal={proposal} />
      </ActionBox>
    );
  }

  return (
    <ActionBox>
      <ParLg>{proposal.status}</ParLg>
    </ActionBox>
  );
};
