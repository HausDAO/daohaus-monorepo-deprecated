import {
  checkHasQuorum,
  formatValueTo,
  toWholeUnits,
} from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { ParMd, TintSecondary } from '@daohaus/ui';
import { ActionTemplate, DummyBar, VoteStatus } from './ActionPrimitives';

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
