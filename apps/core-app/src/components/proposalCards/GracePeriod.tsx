import {
  baalTimeToNow,
  checkHasQuorum,
  formatValueTo,
  toWholeUnits,
} from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { ParMd, TintSecondary } from '@daohaus/ui';
import { useMemo } from 'react';
import {
  ActionTemplate,
  DummyBar,
  Verdict,
  VoteStatus,
} from './ActionPrimitives';

export const GracePeriod = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
  const { address } = useHausConnect();

  const userVoteData = useMemo(() => {
    if (address && proposal) {
      return proposal?.votes?.find(
        (voteData) =>
          voteData?.member?.memberAddress?.toLowerCase?.() ===
          address?.toLowerCase?.()
      );
    }
  }, [address, proposal]);

  const readableTime = useMemo(() => {
    return baalTimeToNow(proposal.graceEnds);
  }, [proposal]);

  const userVoteDisplay =
    userVoteData &&
    `You voted ${userVoteData.approved ? 'Yes' : 'No'} (${formatValueTo({
      value: toWholeUnits(userVoteData.balance || '0'),
      decimals: 2,
      format: 'numberShort',
      separator: '',
    })})`;
  const hasQuorum = checkHasQuorum({
    yesVotes: Number(proposal.yesBalance),
    totalShares: Number(proposal.dao.totalShares),
    quorumPercent: Number(proposal.dao.quorumPercent),
  });
  const didPass =
    Number(proposal.yesBalance) > Number(proposal.noBalance) && hasQuorum;
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
          <Verdict passed={didPass} />
        </>
      }
      helperDisplay={userVoteDisplay}
    />
  );
};
