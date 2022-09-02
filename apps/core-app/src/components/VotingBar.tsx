import { percentage } from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { Progress } from '@daohaus/ui';
import { mintDark, slateDark, tomatoDark } from '@radix-ui/colors';
import { useMemo } from 'react';
import styled from 'styled-components';

const VoteBarBox = styled.div`
  width: 100%;
  margin-bottom: 1.2rem;
`;

export const VotingBar = ({ proposal }: { proposal: ITransformedProposal }) => {
  const percentages = useMemo(() => {
    return [
      {
        percentage: `${percentage(
          Number(proposal.yesBalance),
          Number(proposal.dao.totalShares)
        )}%`,
        color: mintDark.mint10,
      },
      {
        percentage: `${percentage(
          Number(proposal.noBalance),
          Number(proposal.dao.totalShares)
        )}%`,
        color: tomatoDark.tomato10,
      },
      {
        percentage: `${percentage(
          Number(proposal.dao.totalShares) -
            Number(proposal.yesBalance) -
            Number(proposal.noBalance),
          Number(proposal.dao.totalShares)
        )}%`,
        color: slateDark.slate8,
      },
    ];
  }, [proposal]);

  return (
    <VoteBarBox>
      <Progress backgroundColor="pink" progressSection={percentages} />
    </VoteBarBox>
  );
};
