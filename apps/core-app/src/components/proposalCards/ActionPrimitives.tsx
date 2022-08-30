import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';

import { Italic, ParMd } from '@daohaus/ui';

const TemplateBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .top-section {
    display: flex;
    justify-content: space-between;
  }
  .main-section {
    height: 100%;
  }
  .bottom-section {
    margin-top: auto;
  }
`;

const QuorumDisplay = styled.div``;

export const ActionTemplate = ({
  helperText,
  statusDisplay,
  main,
}: {
  helperText?: string;
  statusDisplay?: string | React.ReactNode;
  main?: React.ReactNode;
}) => {
  const theme = useTheme();
  const displayUI = useMemo(() => {
    if (typeof statusDisplay === 'string') {
      return <ParMd>{statusDisplay}</ParMd>;
    }
    return statusDisplay;
  }, [statusDisplay]);
  return (
    <TemplateBox>
      <div className="top-section">
        {displayUI}
        <QuorumDisplay />
      </div>
      <div className="middle-section">{main}</div>
      <div className="bottom-section">
        {helperText && (
          <ParMd color={theme.tint.secondary}>
            <Italic>{helperText}</Italic>
          </ParMd>
        )}
      </div>
    </TemplateBox>
  );
};
