import { ITransformedProposal } from '@daohaus/dao-data';
import { ParMd } from '@daohaus/ui';
import styled from 'styled-components';

const ActionBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProposalActions = ({ proposal }: { proposal: ITransformedProposal }) => {
  return (
    <ActionBox>
      <ParMd>Actions</ParMd>
      <ParMd>Status: {proposal.status}</ParMd>
    </ActionBox>
  );
};

export default ProposalActions;
