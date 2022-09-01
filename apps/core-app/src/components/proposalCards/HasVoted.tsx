import { ParMd, TintSecondary } from '@daohaus/ui';
import { formatValueTo, toWholeUnits } from '@daohaus/common-utilities';
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
  const voterHelperText = approved
    ? `You voted Yes (${formatValueTo({
        value: toWholeUnits(userVoteBalance || '0'),
        decimals: 2,
        format: 'numberShort',
        separator: '',
      })})`
    : `You voted No (${formatValueTo({
        value: toWholeUnits(userVoteBalance || '0'),
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
          <VotingResults proposal={proposal} isVoting={false} />
        </>
      }
      helperDisplay={voterHelperText}
    />
  );
};
