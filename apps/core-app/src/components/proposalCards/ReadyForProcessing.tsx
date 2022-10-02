import React, { useEffect } from 'react';

import { ITransformedProposal } from '@daohaus/dao-data';
import { useBreakpoint, useToast, widthQuery } from '@daohaus/ui';
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

// Adding to the gas limit to account for cost of processProposal
export const PROCESS_PROPOSAL_GAS_LIMIT_ADDITION = 150000;

const ProcessBox = styled.div`
  display: flex;
  justify-content: flex-start;
  .execute {
    margin-left: auto;
  }
  @media ${widthQuery.sm} {
    /* flex-direction: column; */
    .execute {
      min-width: 0;
      width: 100%;
    }
  }
`;

const eligibableStatuses = [0, 6, 7, 3];

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

    setCanProcess(
      eligibableStatuses.some((status) => status === state)
        ? true
        : 'Another proposal in the DAO needs to executed first.'
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
  const isMobile = useBreakpoint(widthQuery.sm);

  const [canProcess, setCanProcess] = React.useState<string | true>(
    'Checking Process data.'
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const processProposal = async () => {
    const { proposalId, proposalData, actionGasEstimate } = proposal;
    // Usually a proposal actionGasEstimate === 0 when the safe vault takes longer to
    // be indexed by the Gnosis API (a DAO was recently summonned)
    // or when a proposal is submitted through a 3rd party contract with baalGas->0 (e.g. TributeMinion)
    const processingGasLimit = (
      Number(actionGasEstimate) > 0
        ? Number(actionGasEstimate) + PROCESS_PROPOSAL_GAS_LIMIT_ADDITION
        : PROCESS_PROPOSAL_GAS_LIMIT_ADDITION * 2
    ).toFixed();

    if (!proposalId) return;
    setIsLoading(true);
    await fireTransaction({
      tx: {
        ...ACTION_TX.PROCESS,
        staticArgs: [proposalId, proposalData],
        overrides: { gasLimit: processingGasLimit },
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
            centerAlign
            fullWidth={isMobile}
          >
            Execute
          </GatedButton>
        </ProcessBox>
      }
    />
  );
};
