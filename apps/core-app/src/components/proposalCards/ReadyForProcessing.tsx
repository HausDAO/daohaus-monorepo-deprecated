import React from 'react';

import { ITransformedProposal } from '@daohaus/dao-data';
import { Button } from '@daohaus/ui';
import styled from 'styled-components';
import {
  ActionTemplate,
  DummyBar,
  GasDisplay,
  VotingResults,
} from './ActionPrimitives';

const ProcessBox = styled.div`
  display: flex;
  justify-content: flex-start;
  .execute {
    margin-left: auto;
  }
  /* justify-content: space-between; */
`;

export const ReadyForProcessing = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
  console.log('proposal', proposal);

  const processProposal = () => {};

  return (
    <ActionTemplate
      statusDisplay="Ready For Processing"
      main={
        <>
          <DummyBar />
          <VotingResults proposal={proposal} isVoting={false} />
        </>
      }
      helperDisplay={
        <ProcessBox>
          {Number(proposal.actionGasEstimate) > 0 && (
            <GasDisplay gasAmt={proposal.actionGasEstimate} />
          )}

          <Button sm onClick={processProposal} className="execute">
            Execute
          </Button>
        </ProcessBox>
      }
    />
  );
};
