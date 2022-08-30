import { ITransformedProposal } from '@daohaus/dao-data';
import { Italic, ParMd } from '@daohaus/ui';
import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { ActionTemplate, DummyBar, Verdict } from './ActionPrimitives';

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
        helperText="Quorum not met"
      />
    </ActionBox>
  );
};
