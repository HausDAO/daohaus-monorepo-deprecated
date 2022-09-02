import { ITransformedProposal } from '@daohaus/dao-data';
import { ActionTemplate, DummyBar, Verdict } from './ActionPrimitives';

export const Expired = (_props: { proposal: ITransformedProposal }) => {
  return (
    <ActionTemplate
      statusDisplay="Proposal expired"
      main={
        <>
          <DummyBar />
          <Verdict passed={false} />{' '}
        </>
      }
    />
  );
};
