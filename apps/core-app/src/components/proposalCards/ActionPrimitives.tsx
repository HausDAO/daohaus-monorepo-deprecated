import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { MdOutlineGavel } from 'react-icons/md';
import { Italic, ParMd, Tooltip } from '@daohaus/ui';
import { RiThumbDownLine, RiThumbUpLine } from 'react-icons/ri';

const TemplateBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .top-section {
    display: flex;
    margin-bottom: 2.4rem;
    justify-content: space-between;
  }
  .main-section {
    height: 100%;
  }
  .bottom-section {
    margin-top: auto;
  }
`;

export const DummyBar = styled.div`
  width: 100%;
  height: 1rem;
  background-color: grey;
  margin-bottom: 1.2rem;
`;

const QuorumBox = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 1.2rem;
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

const VerdictBox = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.6rem;
  }
`;

export const ProposalPass = ({ text }: { text: string }) => {
  const theme = useTheme();

  return (
    <VerdictBox>
      <RiThumbUpLine size="1.6rem" color={theme.tint.secondary} />
      <ParMd color={theme.tint.secondary}>{text}</ParMd>
    </VerdictBox>
  );
};

export const ProposalFail = ({ text }: { text: string }) => {
  const theme = useTheme();

  return (
    <VerdictBox>
      <RiThumbDownLine size="1.6rem" color={theme.tint.secondary} />
      <ParMd color={theme.tint.secondary}>{text}</ParMd>
    </VerdictBox>
  );
};

export const Verdict = ({ passed }: { passed: boolean }) => {
  return passed ? (
    <ProposalPass text="Proposal Passed" />
  ) : (
    <ProposalFail text="Proposal Failed" />
  );
};

export const VoteStatus = ({ passed }: { passed: boolean }) => {
  return passed ? (
    <ProposalPass text="Proposal is Passing" />
  ) : (
    <ProposalFail text="Proposal is Failing" />
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
