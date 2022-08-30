import { ITransformedProposal } from '@daohaus/dao-data';
import styled from 'styled-components';
import {
  ActionTemplate,
  DummyBar,
  GasDisplay,
  Verdict,
} from './ActionPrimitives';

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
      <ActionTemplate
        statusDisplay="Proposal Failed"
        main={
          <div>
            <DummyBar />
            <Verdict passed={false} />
          </div>
        }
        helperDisplay={<GasDisplay gasAmt="Check" />}
      />
    </ActionBox>
  );
};
