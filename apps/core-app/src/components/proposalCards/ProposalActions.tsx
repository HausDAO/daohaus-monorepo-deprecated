import { ITransformedProposal } from '@daohaus/dao-data';
import { Italic, ParMd } from '@daohaus/ui';
import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { ActionTemplate } from './ActionPrimitives';

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
        helperText="Quorum not met"
      />
    </ActionBox>
  );
};
