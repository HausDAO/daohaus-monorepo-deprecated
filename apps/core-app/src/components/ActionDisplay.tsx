import { DecodedMultiTX, isActionError } from '@daohaus/tx-builder-feature';
import { H4 } from '@daohaus/ui';
import React from 'react';
import styled from 'styled-components';

const DisplayContainer = styled.div`
  .display-segment {
    display: flex;
    flex-direction: column;
  }
`;

export const ActionDisplay = ({ actions }: { actions: DecodedMultiTX }) => {
  return (
    <DisplayContainer>
      {actions.map((action) => {
        if (isActionError(action)) {
          return (
            <div className="display-segment">
              <H4>Error</H4>
            </div>
          );
        }
        return (
          <div className="display-segment">
            <H4>{action.name}</H4>
          </div>
        );
      })}
    </DisplayContainer>
  );
};
