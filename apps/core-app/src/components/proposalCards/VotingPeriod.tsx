import {
  baalTimeToNow,
  formatPeriods,
  formatValueTo,
  toBaseUnits,
  toWholeUnits,
} from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useTxBuilder } from '@daohaus/tx-builder-feature';
import { ParMd, TintSecondary } from '@daohaus/ui';
import { formatDistanceToNow } from 'date-fns';
import React, { MouseEvent, useMemo } from 'react';
import { RiThumbDownLine, RiThumbUpLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { useConnectedMembership } from '../../contexts/DaoContext';
import {
  ActionTemplate,
  DummyBar,
  VoteBox,
  VoteDownButton,
  VoteUpButton,
} from './ActionPrimitives';

export const VotingPeriod = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
  return <HasNotVoted proposal={proposal} />;
};

enum Vote {
  Yes = 'yes',
  No = 'no',
}
export const HasNotVoted = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
  const { daochain } = useParams();
  const { chainId } = useHausConnect();
  const { connectedMembership } = useConnectedMembership();
  const { fireTransaction } = useTxBuilder();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleVote = (e: MouseEvent<HTMLButtonElement>) => {
    const { proposalId } = proposal;
    console.log('e', e);
    const vote = e.currentTarget.value;

    if (!proposalId || vote !== Vote.Yes || vote !== Vote.No) return;
    // setIsLoading(true);
    // fireTransaction({
    //   tx: { ...ACTION_TX.SPONSOR, staticArgs: [proposalId] } as TXLego,
    //   lifeCycleFns: {
    //     onTxError: (error) => {
    //       const errMsg = handleErrorMessage({
    //         error,
    //       });
    //       errorToast({ title: 'Sponsor Failed', description: errMsg });
    //       setIsLoading(false);
    //     },
    //     onTxSuccess: () => {
    //       defaultToast({
    //         title: 'Sponsor Success',
    //         description: 'Please wait for subgraph to sync',
    //       });
    //     },
    //     onPollError: (error) => {
    //       const errMsg = handleErrorMessage({
    //         error,
    //       });
    //       errorToast({ title: 'Poll Error', description: errMsg });
    //       setIsLoading(false);
    //     },
    //     onPollSuccess: () => {
    //       successToast({
    //         title: 'Sponsor Success',
    //         description: 'Proposal sponsored',
    //       });
    //       setIsLoading(false);
    //     },
    //   },
    // });
  };

  const readableTime = useMemo(() => {
    return baalTimeToNow(proposal.votingEnds);
  }, [proposal]);
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
  console.log('hasShares', hasShares);
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
              rules={[hasShares, isConnectedToDao]}
              value={Vote.No}
              onClick={handleVote}
            >
              No (
              {formatValueTo({
                value: toWholeUnits(proposal.yesVotes),
                decimals: 2,
                format: 'numberShort',
                separator: '',
              })}
              )
            </VoteDownButton>
            <VoteUpButton
              sm
              centerAlign
              rules={[hasShares, isConnectedToDao]}
              value={Vote.No}
              onClick={handleVote}
            >
              Yes (
              {formatValueTo({
                value: toWholeUnits(proposal.noVotes),
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

export const HasVoted = ({ proposal }: { proposal: ITransformedProposal }) => {
  return null;
};
