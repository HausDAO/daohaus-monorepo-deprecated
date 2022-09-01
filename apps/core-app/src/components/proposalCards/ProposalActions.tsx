import { PROPOSAL_STATUS } from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { ParLg } from '@daohaus/ui';
import styled from 'styled-components';
import { GracePeriod } from './GracePeriod';
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
  if (proposal.status === PROPOSAL_STATUS.unsponsored) {
    return (
      <ActionBox>
        <Unsponsored proposal={proposal} />
      </ActionBox>
    );
  }
  if (proposal.status === PROPOSAL_STATUS.voting) {
    return (
      <ActionBox>
        <VotingPeriod proposal={proposal} />
      </ActionBox>
    );
  }
  if (proposal.status === PROPOSAL_STATUS.grace) {
    return (
      <ActionBox>
        <GracePeriod proposal={proposal} />
      </ActionBox>
    );
  }
  if (proposal.status === PROPOSAL_STATUS.needsProcessing) {
    return <ActionBox></ActionBox>;
  }

  return (
    <ActionBox>
      <ParLg>{proposal.status}</ParLg>
    </ActionBox>
  );
};
