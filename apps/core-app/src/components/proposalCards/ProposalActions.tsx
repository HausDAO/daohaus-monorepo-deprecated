import { PROPOSAL_STATUS } from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { ParMd } from '@daohaus/ui';
import styled from 'styled-components';
import { ActionFailed } from './ActionFailed';
import { ActionTemplate } from './ActionPrimitives';
import { Cancelled } from './Cancelled';
import { Expired } from './Expired';
import { Failed } from './Failed';
import { GracePeriod } from './GracePeriod';
import { Passed } from './Passed';
import { ReadyForProcessing } from './ReadyForProcessing';
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
  if (proposal.status === PROPOSAL_STATUS.cancelled) {
    return (
      <ActionBox>
        <Cancelled proposal={proposal} />
      </ActionBox>
    );
  }
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
    return (
      <ActionBox>
        <ReadyForProcessing proposal={proposal} />
      </ActionBox>
    );
  }
  if (proposal.status === PROPOSAL_STATUS.passed) {
    return (
      <ActionBox>
        <Passed proposal={proposal} />
      </ActionBox>
    );
  }
  if (proposal.status === PROPOSAL_STATUS.failed) {
    return (
      <ActionBox>
        <Failed proposal={proposal} />
      </ActionBox>
    );
  }
  if (proposal.status === PROPOSAL_STATUS.actionFailed) {
    return (
      <ActionBox>
        <ActionFailed proposal={proposal} />
      </ActionBox>
    );
  }
  if (proposal.status === PROPOSAL_STATUS.expired) {
    return (
      <ActionBox>
        <Expired proposal={proposal} />
      </ActionBox>
    );
  }
  return (
    <ActionBox>
      <ActionTemplate
        statusDisplay="Unknown Status"
        main={<ParMd>Proposal Status {proposal.status} not found</ParMd>}
      />
    </ActionBox>
  );
};
