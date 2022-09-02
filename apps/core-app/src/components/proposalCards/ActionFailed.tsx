import { ITransformedProposal } from '@daohaus/dao-data';
import { Italic, ParSm } from '@daohaus/ui';
import { ActionTemplate, DummyBar } from './ActionPrimitives';

export const ActionFailed = (_props: { proposal: ITransformedProposal }) => {
  return (
    <ActionTemplate
      statusDisplay="External Action Failed"
      main={<VotingBar proposal={proposal} /> />}
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
