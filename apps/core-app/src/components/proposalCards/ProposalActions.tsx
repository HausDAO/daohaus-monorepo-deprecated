import { ITransformedProposal } from '@daohaus/dao-data';
import { ParLg } from '@daohaus/ui';
import styled from 'styled-components';
import { Unsponsored } from './Unsponsored';

const ActionBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 31rem;
`;

export const ProposalActions = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
  if (proposal.status === 'unsponsored') {
    return (
      <ActionBox>
        <Unsponsored proposal={proposal} />
      </ActionBox>
    );
  }

  console.log('proposal', proposal);

  return (
    <ActionBox>
      <ParLg>{proposal.status}</ParLg>
    </ActionBox>
  );
};
