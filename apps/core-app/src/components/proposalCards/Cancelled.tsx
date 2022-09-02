import { ITransformedProposal } from '@daohaus/dao-data';
import React from 'react';
import { ActionTemplate, DummyBar, Verdict } from './ActionPrimitives';

export const Cancelled = (_props: { proposal: ITransformedProposal }) => {
  return (
    <ActionTemplate
      statusDisplay="Proposal Cancelled"
      main={
        <>
          <DummyBar />
          <Verdict passed={false} />{' '}
        </>
      }
    />
  );
};
