import React, { MouseEvent } from 'react';
import { useParams } from 'react-router-dom';

import {
  formatShares,
  handleErrorMessage,
  TXLego,
} from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useTxBuilder } from '@daohaus/tx-builder-feature';
import { ParMd, TintSecondary, useToast } from '@daohaus/ui';

import { useConnectedMembership, useDao } from '@daohaus/dao-context';
import { ACTION_TX } from '../../legos/tx';
import {
  ActionTemplate,
  VoteBox,
  VoteDownButton,
  VoteUpButton,
} from './ActionPrimitives';
import { VotingBar } from '../VotingBar';

enum Vote {
  Yes = 'yes',
  No = 'no',
}

export const HasNotVoted = ({
  proposal,
  readableTime,
}: {
  proposal: ITransformedProposal;
  readableTime?: string;
}) => {
  const { daochain } = useParams();
  const { chainId } = useHausConnect();
  const { connectedMembership } = useConnectedMembership();
  const { fireTransaction } = useTxBuilder();
  const { errorToast, defaultToast, successToast } = useToast();
  const { refreshAll } = useDao();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleVote = async (e: MouseEvent<HTMLButtonElement>) => {
    const { proposalId } = proposal;

    const vote = e.currentTarget.value as Vote;
    if (!proposalId || !vote) return;
    const voteValue = vote === Vote.Yes ? true : false;

    setIsLoading(true);
    await fireTransaction({
      tx: { ...ACTION_TX.VOTE, staticArgs: [proposalId, voteValue] } as TXLego,
      lifeCycleFns: {
        onTxError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: 'Vote Failed', description: errMsg });
          setIsLoading(false);
        },
        onTxSuccess: () => {
          defaultToast({
            title: 'Vote Success',
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
            title: 'Vote Success',
            description: 'Proposal sponsored',
          });
          refreshAll();
          setIsLoading(false);
        },
      },
    });
  };

  console.log('connectedMembership', connectedMembership);

  const readableVotePower =
    connectedMembership && Number(connectedMembership?.delegateShares)
      ? `Cast Your Vote (${formatShares(connectedMembership.delegateShares)})`
      : undefined;

  const hasShares = Number(connectedMembership?.delegateShares)
    ? true
    : 'You must have voting tokens to vote';

  const isConnectedToDao =
    chainId === daochain
      ? true
      : 'You are not connected to the same network as the DAO';
  const isNotLoading = !isLoading
    ? true
    : 'Please wait for transaction to complete';
  return (
    <ActionTemplate
      proposal={proposal}
      statusDisplay={
        <ParMd>
          Voting ends in <TintSecondary>{readableTime}</TintSecondary>
        </ParMd>
      }
      main={
        <div>
          <VotingBar proposal={proposal} />
          <VoteBox>
            <VoteDownButton
              sm
              centerAlign
              rules={[hasShares, isConnectedToDao, isNotLoading]}
              value={Vote.No}
              onClick={handleVote}
            >
              No ({formatShares(proposal.noBalance)})
            </VoteDownButton>
            <VoteUpButton
              sm
              centerAlign
              rules={[hasShares, isConnectedToDao, isNotLoading]}
              value={Vote.Yes}
              onClick={handleVote}
            >
              Yes ({formatShares(proposal.yesBalance)})
            </VoteUpButton>
          </VoteBox>
        </div>
      }
      helperDisplay={readableVotePower}
    />
  );
};
