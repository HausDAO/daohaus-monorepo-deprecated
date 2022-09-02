import { roundedPercentage } from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { ActionTemplate, DummyBar, Verdict } from './ActionPrimitives';

export const Failed = ({ proposal }: { proposal: ITransformedProposal }) => {
  const percentNo = roundedPercentage(
    Number(proposal.noBalance),
    Number(proposal.dao.totalShares)
  );

  return (
    <ActionTemplate
      statusDisplay="Proposal Failed"
      main={
        <>
          <DummyBar />
          <Verdict passed={false} appendText={` - ${percentNo}% No`} />{' '}
        </>
      }
    />
  );
};
