import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { MdOutlineGavel } from 'react-icons/md';
import { Italic, ParMd, Tooltip } from '@daohaus/ui';

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

const QuorumBox = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.6rem;
  }
`;

const QuorumDisplay = ({ quorumAmt }: { quorumAmt: number | number }) => {
  const theme = useTheme();

  return (
    <Tooltip
      triggerEl={
        <QuorumBox>
          <MdOutlineGavel color={theme.tint.secondary} size="1.4rem" />{' '}
          <ParMd color={theme.tint.secondary}>{quorumAmt}%</ParMd>{' '}
        </QuorumBox>
      }
      content={`${quorumAmt}% ‘Yes’ voting stake was 
needed to meet Quorum.`}
      side="bottom"
    />
  );
};

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
        <QuorumDisplay quorumAmt={2} />
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
