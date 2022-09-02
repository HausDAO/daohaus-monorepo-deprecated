import { ITransformedProposal } from '@daohaus/dao-data';
import { ActionTemplate, DummyBar } from './ActionPrimitives';

export const ActionFailed = (_props: { proposal: ITransformedProposal }) => {
  return (
    <ActionTemplate
      statusDisplay="Proposal Failed"
      main={<DummyBar />}
      // helperDisplay={}
    />
  );
};
