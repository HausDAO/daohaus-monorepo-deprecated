import styled from 'styled-components';
import {
  formatShortDateTimeFromSeconds,
  formatValueTo,
  fromWei,
  Keychain,
} from '@daohaus/common-utilities';
import { AddressDisplay, DataMd, ParMd, widthQuery } from '@daohaus/ui';

import { TProposals } from '@daohaus/dao-context';
import { useParams } from 'react-router-dom';

const VotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.4rem;
  margin-top: 3rem;
  min-width: 50rem;
  @media ${widthQuery.sm} {
    min-width: 100%;
  }
`;

const VoteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 1.2rem;
`;

type VoteListProps = {
  proposal: TProposals[number];
  votes: TProposals[number]['votes'];
};

export const VoteList = ({ votes, proposal }: VoteListProps) => {
  const { daochain } = useParams();
  return (
    <VotesContainer>
      {votes?.map((vote) => (
        <div key={vote.id}>
          <ParMd>{formatShortDateTimeFromSeconds(vote.createdAt)}</ParMd>
          <VoteContainer>
            <AddressDisplay
              address={vote.member.memberAddress}
              truncate
              copy
              explorerNetworkId={daochain as keyof Keychain}
            />
            <DataMd>
              {vote.approved ? 'Yes' : 'No'} -{' '}
              {formatValueTo({
                value: fromWei(vote.balance),
                decimals: 2,
                format: 'numberShort',
              })}
            </DataMd>
          </VoteContainer>
        </div>
      ))}

      <VoteContainer>
        <ParMd>Total</ParMd>
        <DataMd>
          {formatValueTo({
            value: fromWei(proposal.yesBalance),
            decimals: 2,
            format: 'numberShort',
          })}{' '}
          Yes /{' '}
          {formatValueTo({
            value: fromWei(proposal.noBalance),
            decimals: 2,
            format: 'numberShort',
          })}
          No
        </DataMd>
      </VoteContainer>
    </VotesContainer>
  );
};
