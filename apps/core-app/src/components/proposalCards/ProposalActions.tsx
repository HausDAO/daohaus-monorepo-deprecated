import { ITransformedProposal } from '@daohaus/dao-data';
import styled from 'styled-components';
import {
  ActionTemplate,
  DummyBar,
  GasDisplay,
  Verdict,
} from './ActionPrimitives';
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
  return (
    <ActionBox>
      <Unsponsored proposal={proposal} />
    </ActionBox>
  );
};
