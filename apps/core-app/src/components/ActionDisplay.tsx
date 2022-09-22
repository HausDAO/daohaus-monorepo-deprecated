import { DecodedMultiTX, isActionError } from '@daohaus/tx-builder-feature';
import { DataSm, Divider, H4 } from '@daohaus/ui';
import React from 'react';
import styled from 'styled-components';

const DisplayContainer = styled.div`
  margin-top: 2rem;

  .display-segment {
    display: flex;
    flex-direction: column;
  }
  .space-all {
    word-break: break-all;
  }
  .space-all :nth-child(n) {
    margin-bottom: 2rem;
  }
`;

export const ActionDisplay = ({ actions }: { actions: DecodedMultiTX }) => {
  return (
    <DisplayContainer>
      {actions.map((action, index) => {
        if (isActionError(action)) {
          return (
            <div className="display-segment">
              <H4>Action {index}Error</H4>
              <div></div>
            </div>
          );
        }
        return (
          <div className="display-segment">
            <div className="space-all">
              <H4>
                Action {index + 1}: {action.name}
              </H4>
              <DataSm>TARGET</DataSm>
              <DataSm>{action.to}</DataSm>
              <DataSm>VALUE</DataSm>
              <DataSm>{action.value}</DataSm>
              <Divider />
            </div>
            {action.params.map((arg, index) => {
              return (
                <div className="space-all">
                  <DataSm>
                    PARAM{index + 1}: {arg.name}
                  </DataSm>
                  <DataSm>TYPE: {arg.type}</DataSm>
                  <DataSm>VALUE: {arg.value}</DataSm>
                  <Divider />
                </div>
              );
            })}
          </div>
        );
      })}
    </DisplayContainer>
  );
};
