import {
  baalTimeToNow,
  checkHasQuorum,
  formatPeriods,
  formatValueTo,
  handleErrorMessage,
  percentage,
  toBaseUnits,
  toWholeUnits,
  TXLego,
} from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useTxBuilder } from '@daohaus/tx-builder-feature';
import { ParMd, TintSecondary, useToast } from '@daohaus/ui';
import { formatDistanceToNow } from 'date-fns';
import React, { MouseEvent, useMemo } from 'react';
import { RiThumbDownLine, RiThumbUpLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { useConnectedMembership, useDao } from '../../contexts/DaoContext';
import { ACTION_TX } from '../../legos/tx';
import {
  ActionTemplate,
  DummyBar,
  VoteBox,
  VoteDownButton,
  VoteStatus,
  VoteUpButton,
} from './ActionPrimitives';

export const VotingPeriod = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
  const { address } = useHausConnect();
  const readableTime = useMemo(() => {
    return baalTimeToNow(proposal.votingEnds);
  }, [proposal]);
  const userVoteData = useMemo(() => {
    if (address && proposal) {
      return proposal?.votes?.find(
        (voteData) =>
          voteData?.member?.memberAddress?.toLowerCase?.() ===
          address?.toLowerCase?.()
      );
    }
  }, [address, proposal]);

  return userVoteData ? (
    <HasVoted
      proposal={proposal}
      approved={userVoteData?.approved}
      readableTime={readableTime}
    />
  ) : (
    <HasNotVoted proposal={proposal} readableTime={readableTime} />
  );
};

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

  const readableVotePower = connectedMembership?.shares
    ? `Cast Your Vote (${formatValueTo({
        value: toWholeUnits(connectedMembership?.shares) || 0,
        decimals: 2,
        format: 'numberShort',
        separator: '',
      })})`
    : undefined;

  const hasShares = connectedMembership?.shares
    ? true
    : 'You must have shares to vote';

  const isConnectedToDao =
    chainId === daochain
      ? true
      : 'You are not connected to the same network as the DAO';
  const isNotLoading = !isLoading
    ? true
    : 'Please wait for transaction to complete';
  return (
    <ActionTemplate
      statusDisplay={
        <ParMd>
          Voting ends in <TintSecondary>{readableTime}</TintSecondary>
        </ParMd>
      }
      main={
        <div>
          <DummyBar />
          <VoteBox>
            <VoteDownButton
              sm
              centerAlign
              rules={[hasShares, isConnectedToDao, isNotLoading]}
              value={Vote.No}
              onClick={handleVote}
            >
              No (
              {formatValueTo({
                value: toWholeUnits(proposal.yesBalance),
                decimals: 2,
                format: 'numberShort',
                separator: '',
              })}
              )
            </VoteDownButton>
            <VoteUpButton
              sm
              centerAlign
              rules={[hasShares, isConnectedToDao, isNotLoading]}
              value={Vote.Yes}
              onClick={handleVote}
            >
              Yes (
              {formatValueTo({
                value: toWholeUnits(proposal.noBalance),
                decimals: 2,
                format: 'numberShort',
                separator: '',
              })}
              )
            </VoteUpButton>
          </VoteBox>
        </div>
      }
      helperDisplay={readableVotePower}
    />
  );
};

export const HasVoted = ({
  proposal,
  approved,
  readableTime,
}: {
  proposal: ITransformedProposal;
  approved?: boolean;
  readableTime?: string;
}) => {
  console.log('proposal', proposal);
  const hasQuorum = checkHasQuorum({
    yesVotes: Number(proposal.yesBalance),
    totalShares: Number(proposal.dao.totalShares),
    quorumPercent: Number(proposal.dao.quorumPercent),
  });
  const isPassing =
    Number(proposal.yesBalance) > Number(proposal.noBalance) && hasQuorum;
  const voterHelperText = approved
    ? `You voted Yes (${formatValueTo({
        value: toWholeUnits(proposal.yesBalance),
        decimals: 2,
        format: 'numberShort',
        separator: '',
      })})`
    : `You voted No (${formatValueTo({
        value: toWholeUnits(proposal.noBalance),
        decimals: 2,
        format: 'numberShort',
        separator: '',
      })})`;
  return (
    <ActionTemplate
      statusDisplay={
        <ParMd>
          Voting ends in <TintSecondary>{readableTime}</TintSecondary>
        </ParMd>
      }
      main={
        <>
          <DummyBar />
          <VoteStatus passing={isPassing} />
        </>
      }
      helperDisplay={voterHelperText}
    />
  );
};
