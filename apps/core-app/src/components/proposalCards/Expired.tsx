import { ITransformedProposal } from '@daohaus/dao-data';
import { VotingBar } from '../VotingBar';
import { ActionTemplate, Verdict } from './ActionPrimitives';

export const Expired = ({ proposal }: { proposal: ITransformedProposal }) => {
  return (
    <ActionTemplate
      statusDisplay="Proposal expired"
      main={
        <>
          <VotingBar proposal={proposal} />
          <Verdict passed={false} />{' '}
        </>
      }
    />
  );
};
