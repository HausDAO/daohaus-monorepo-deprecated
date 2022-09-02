import { ITransformedProposal } from '@daohaus/dao-data';
import React from 'react';
import { ActionTemplate, DummyBar, Verdict } from './ActionPrimitives';

export const Passed = (props: { proposal: ITransformedProposal }) => {
  return (
    <ActionTemplate
      statusDisplay="Proposal Passed"
      main={
        <>
          <DummyBar />
          <Verdict passed={true} />
        </>
      }
    />
  );
};
