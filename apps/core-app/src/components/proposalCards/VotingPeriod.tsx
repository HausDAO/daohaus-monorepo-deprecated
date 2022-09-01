import {
  baalTimeToNow,
  formatPeriods,
  formatValueTo,
  toBaseUnits,
  toWholeUnits,
} from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { ParMd, TintSecondary } from '@daohaus/ui';
import { formatDistanceToNow } from 'date-fns';
import React, { useMemo } from 'react';
import { RiThumbDownLine, RiThumbUpLine } from 'react-icons/ri';
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

export const HasNotVoted = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { connectedMembership } = useConnectedMembership();
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
            <VoteDownButton sm centerAlign disabled={isLoading}>
              No (
              {formatValueTo({
                value: toWholeUnits(proposal.yesVotes),
                decimals: 2,
                format: 'numberShort',
                separator: '',
              })}
              )
            </VoteDownButton>
            <VoteUpButton sm centerAlign disabled={isLoading}>
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
