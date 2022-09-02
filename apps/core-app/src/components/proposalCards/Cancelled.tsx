import { ITransformedProposal } from '@daohaus/dao-data';
import React from 'react';
import { VotingBar } from '../VotingBar';
import { ActionTemplate, Verdict } from './ActionPrimitives';

export const Cancelled = ({ proposal }: { proposal: ITransformedProposal }) => {
  return (
    <ActionTemplate
      proposal={proposal}
      statusDisplay="Proposal Cancelled"
      main={
        <>
          <VotingBar proposal={proposal} />
          <Verdict passed={false} />{' '}
        </>
      }
    />
  );
};
