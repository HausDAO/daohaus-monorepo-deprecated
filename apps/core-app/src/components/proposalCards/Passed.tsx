import React from 'react';

import { ITransformedProposal } from '@daohaus/dao-data';
import { ActionTemplate, DummyBar, Verdict } from './ActionPrimitives';
import { roundedPercentage } from '@daohaus/common-utilities';

export const Passed = ({ proposal }: { proposal: ITransformedProposal }) => {
  const percentYes = roundedPercentage(
    Number(proposal.yesBalance),
    Number(proposal.dao.totalShares)
  );

  return (
    <ActionTemplate
      statusDisplay="Proposal Passed"
      main={
        <>
          <DummyBar />
          <Verdict passed={true} appendText={` - ${percentYes}% Yes`} />
        </>
      }
    />
  );
};
