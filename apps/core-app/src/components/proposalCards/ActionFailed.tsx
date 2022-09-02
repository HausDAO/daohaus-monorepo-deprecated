import { ITransformedProposal } from '@daohaus/dao-data';
import { Italic, ParSm } from '@daohaus/ui';
import { VotingBar } from '../VotingBar';
import { ActionTemplate } from './ActionPrimitives';

export const ActionFailed = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
  return (
    <ActionTemplate
      proposal={proposal}
      statusDisplay="External Action Failed"
      main={<VotingBar proposal={proposal} />}
      helperDisplay={
        <ParSm>
          <Italic>
            The external contract interaction failed. See details for more
            information."
          </Italic>
        </ParSm>
      }
    />
  );
};
