import React from 'react';

import { ITransformedProposal } from '@daohaus/dao-data';
import { useToast } from '@daohaus/ui';
import styled from 'styled-components';
import {
  ActionTemplate,
  DummyBar,
  GasDisplay,
  VotingResults,
} from './ActionPrimitives';
import { useParams } from 'react-router-dom';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useDao } from '../../contexts/DaoContext';
import { useTxBuilder } from '@daohaus/tx-builder-feature';
import { handleErrorMessage, TXLego } from '@daohaus/common-utilities';
import { ACTION_TX } from '../../legos/tx';
import { GatedButton } from './GatedButton';

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
  const { daochain } = useParams();
  const { chainId } = useHausConnect();
  const { fireTransaction } = useTxBuilder();
  const { errorToast, defaultToast, successToast } = useToast();
  const { refreshAll } = useDao();

  const [isLoading, setIsLoading] = React.useState(false);

  const processProposal = async () => {
    const { proposalId, proposalData } = proposal;

    if (!proposalId) return;
    setIsLoading(true);
    await fireTransaction({
      tx: {
        ...ACTION_TX.PROCESS,
        staticArgs: [proposalId, proposalData],
      } as TXLego,
      lifeCycleFns: {
        onTxError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: 'Process Failed', description: errMsg });
          setIsLoading(false);
        },
        onTxSuccess: () => {
          defaultToast({
            title: 'Process Success',
            description: 'Please wait for subgraph to sync',
          });
        },
        onPollError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: 'Poll Error', description: errMsg });
          setIsLoading(false);
        },
        onPollSuccess: () => {
          successToast({
            title: 'Process Success',
            description: 'Proposal processed',
          });
          refreshAll();
          setIsLoading(false);
        },
      },
    });
  };

  const isConnectedToDao =
    chainId === daochain
      ? true
      : 'You are not connected to the same network as the DAO';
  const isNotLoading = !isLoading
    ? true
    : 'Please wait for transaction to complete';

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

          <GatedButton
            sm
            onClick={processProposal}
            className="execute"
            rules={[isConnectedToDao, isNotLoading]}
          >
            Execute
          </GatedButton>
        </ProcessBox>
      }
    />
  );
};
