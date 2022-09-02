import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { MdOutlineGavel } from 'react-icons/md';
import { Italic, ParMd, Tooltip } from '@daohaus/ui';
import {
  RiGasStationLine,
  RiThumbDownLine,
  RiThumbUpLine,
} from 'react-icons/ri';
import { mintDark, tomatoDark } from '@radix-ui/colors';
import { GatedButton } from './GatedButton';
import { ITransformedProposal } from '@daohaus/dao-data';
import { checkHasQuorum } from '@daohaus/common-utilities';

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

export const Verdict = ({
  passed,
  appendText = '',
}: {
  passed: boolean;
  appendText?: string;
}) => {
  return passed ? (
    <ProposalPass text={`Proposal Passed${appendText}`} />
  ) : (
    <ProposalFail text={`Proposal Failed${appendText}`} />
  );
};

export const VoteStatus = ({
  passing,
  appendText = '',
}: {
  passing: boolean;
  appendText?: string;
}) => {
  return passing ? (
    <ProposalPass text="Proposal is Passing" />
  ) : (
    <ProposalFail text="Proposal is Failing" />
  );
};

export const VotingResults = ({
  isVoting,
  proposal,
}: {
  isVoting: boolean;
  proposal: ITransformedProposal;
}) => {
  const hasQuorum = checkHasQuorum({
    yesVotes: Number(proposal.yesBalance),
    totalShares: Number(proposal.dao.totalShares),
    quorumPercent: Number(proposal.dao.quorumPercent),
  });
  const didPass =
    Number(proposal.yesBalance) > Number(proposal.noBalance) && hasQuorum;
  return isVoting ? (
    <VoteStatus passing={didPass} />
  ) : (
    <Verdict passed={didPass} />
  );
};

export const ActionTemplate = ({
  helperDisplay,
  statusDisplay,
  main,
  quorumAmt,
}: {
  helperDisplay?: string | React.ReactNode;
  statusDisplay?: string | React.ReactNode;
  main?: React.ReactNode;
  quorumAmt?: number;
}) => {
  const theme = useTheme();
  const displayUI = useMemo(() => {
    if (typeof statusDisplay === 'string') {
      return <ParMd>{statusDisplay}</ParMd>;
    }
    return statusDisplay;
  }, [statusDisplay]);
  const helperUI = useMemo(() => {
    if (typeof helperDisplay === 'string') {
      return (
        <ParMd color={theme.tint.secondary}>
          {' '}
          <Italic>{helperDisplay}</Italic>
        </ParMd>
      );
    }
    return helperDisplay;
  }, [helperDisplay, theme]);
  return (
    <TemplateBox>
      <div className="top-section">
        {displayUI}
        {quorumAmt && <QuorumDisplay quorumAmt={2} />}
      </div>
      <div className="middle-section">{main}</div>
      <div className="bottom-section">{helperUI}</div>
    </TemplateBox>
  );
};

const GasBox = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 1.2rem;
  }
`;

export const GasDisplay = ({ gasAmt }: { gasAmt: string | number }) => {
  const theme = useTheme();
  return (
    <Tooltip
      triggerEl={
        <GasBox>
          <RiGasStationLine color={theme.primary} size="1.6rem" />
          <ParMd color={theme.primary}>Estimate Gas</ParMd>
        </GasBox>
      }
      content={`If gas is less than ${gasAmt}, the proposal will likely fail.`}
      side="bottom"
    />
  );
};

export const VoteUpButton = styled(GatedButton)`
  background-color: ${mintDark.mint10};
  border: 1px solid ${mintDark.mint10};
  color: ${mintDark.mint1};
  min-width: 7rem;

  :hover {
    background-color: ${mintDark.mint11};
    border: 1px solid ${mintDark.mint11};
  }
  :focus {
    background-color: ${mintDark.mint11};
    border: 1px solid ${mintDark.mint11};
  }
  :active {
    background-color: ${mintDark.mint10};
    border: 1px solid ${mintDark.mint10};
  }
  :disabled {
    background-color: ${mintDark.mint12};
    border: 1px solid ${mintDark.mint12};
  }
`;
export const VoteDownButton = styled(GatedButton)`
  background-color: ${tomatoDark.tomato10};
  border: 1px solid ${tomatoDark.tomato10};
  color: ${tomatoDark.tomato1};
  min-width: 7rem;

  :hover {
    background-color: ${tomatoDark.tomato11};
    border: 1px solid ${tomatoDark.tomato11};
  }
  :focus {
    background-color: ${tomatoDark.tomato11};
    border: 1px solid ${tomatoDark.tomato11};
  }
  :active {
    background-color: ${tomatoDark.tomato10};
    border: 1px solid ${tomatoDark.tomato10};
  }
  :disabled {
    background-color: ${tomatoDark.tomato12};
    border: 1px solid ${tomatoDark.tomato12};
  }
`;
export const VoteBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
