import { ParMd, TintSecondary } from '@daohaus/ui';
import { formatShares } from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';

import { ActionTemplate, DummyBar, VotingResults } from './ActionPrimitives';

export const HasVoted = ({
  proposal,
  approved,
  userVoteBalance,
  readableTime,
}: {
  proposal: ITransformedProposal;
  approved?: boolean;
  userVoteBalance?: string;
  readableTime?: string;
}) => {
  const voterHelperText = `You voted ${approved ? 'Yes' : 'No'} (${formatShares(
    userVoteBalance || '0'
  )})`;

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
          <VotingResults proposal={proposal} isVoting={false} />
        </>
      }
      helperDisplay={voterHelperText}
    />
  );
};
