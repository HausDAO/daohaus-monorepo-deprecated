import React, { useEffect } from 'react';

import { ITransformedProposal } from '@daohaus/dao-data';
import { useToast } from '@daohaus/ui';
import styled from 'styled-components';
import { ActionTemplate, GasDisplay, Verdict } from './ActionPrimitives';
import { useParams } from 'react-router-dom';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useDao } from '@daohaus/dao-context';
import { createContract, useTxBuilder } from '@daohaus/tx-builder-feature';
import {
  handleErrorMessage,
  isValidNetwork,
  ReactSetter,
  roundedPercentage,
  TXLego,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { ACTION_TX } from '../../legos/tx';
import { GatedButton } from './GatedButton';
import { VotingBar } from '../VotingBar';
import { LOCAL_ABI } from '@daohaus/abi-utilities';

const ProcessBox = styled.div`
  display: flex;
  justify-content: flex-start;
  .execute {
    margin-left: auto;
  }
  /* justify-content: space-between; */
`;

const eligibableStatuses = ['0', '6', '7', '3'];

const checkCanProcess = async ({
  daoid,
  daochain,
  prevProposalId,
  setCanProcess,
}: {
  daoid: string;
  daochain: ValidNetwork;
  prevProposalId: string;
  setCanProcess: ReactSetter<string | true>;
}) => {
  try {
    const state = await createContract({
      address: daoid,
      abi: LOCAL_ABI.BAAL,
      chainId: daochain,
    })['state'](prevProposalId);
    console.log('state', state);
    setCanProcess(
      eligibableStatuses.some((status) => status === state)
        ? true
        : 'Another proposal in the DAO needs to sponsored first. Start digging, sport!'
    );
  } catch (error) {
    setCanProcess('Network Error. Could not check for Proposal status');
  }
};

export const ReadyForProcessing = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
  const { daochain, daoid } = useParams();
  const { chainId } = useHausConnect();
  const { fireTransaction } = useTxBuilder();
  const { errorToast, defaultToast, successToast } = useToast();
  const { refreshAll } = useDao();

  const [canProcess, setCanProcess] = React.useState<string | true>(
    'Checking Process data.'
  );
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

  useEffect(() => {
    if (daoid && isValidNetwork(daochain)) {
      checkCanProcess({
        daochain,
        daoid,
        prevProposalId: proposal.prevProposalId,
        setCanProcess,
      });
    }
  }, [proposal, daoid, daochain]);

  const isConnectedToDao =
    chainId === daochain
      ? true
      : 'You are not connected to the same network as the DAO';
  const isNotLoading = !isLoading
    ? true
    : 'Please wait for transaction to complete';

  const percentYes = roundedPercentage(
    Number(proposal.yesBalance),
    Number(proposal.dao.totalShares)
  );

  return (
    <ActionTemplate
      proposal={proposal}
      statusDisplay="Ready For Processing"
      main={
        <>
          <VotingBar proposal={proposal} />
          <Verdict passed appendText={` - ${percentYes}% Yes`} />
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
            rules={[isConnectedToDao, isNotLoading, canProcess]}
          >
            Execute
          </GatedButton>
        </ProcessBox>
      }
    />
  );
};
