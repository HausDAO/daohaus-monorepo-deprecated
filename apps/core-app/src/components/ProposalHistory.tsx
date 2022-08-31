import { useMemo } from 'react';
import styled from 'styled-components';
import {
  formatDateTimeFromSeconds,
  getNetwork,
  PROPOSAL_STATUS,
} from '@daohaus/common-utilities';
import { useParams } from 'react-router-dom';
import { TProposals, useMembers } from '../contexts/DaoContext';
import { ProposalHistoryCard } from './ProposalHistoryCard';

const HistoryContainer = styled.div`
  margin-top: 3rem;
`;

type ProposalHistoryProps = {
  proposal?: TProposals[number];
};

export type ProposalHistoryElementData = {
  dataType: 'member' | 'dataIndicator';
  label: string;
  data: string;
};

export type ProposalHistoryElement = {
  title: string;
  active: boolean;
  text?: string;
  canExpand: boolean;
  dataElements?: ProposalHistoryElementData[];
  txHash?: string;
};

export const ProposalHistory = ({ proposal }: ProposalHistoryProps) => {
  const { daochain } = useParams();
  const historyData: ProposalHistoryElement[] | null = useMemo(() => {
    if (!proposal || !daochain) return null;

    const networkData = getNetwork(daochain);
    console.log('propposal', proposal);

    // get prop status
    // build based on that

    return [
      {
        title: 'Submitted',
        active: proposal.status === PROPOSAL_STATUS.unsponsored,
        text: formatDateTimeFromSeconds(proposal.createdAt),
        canExpand: true,
        dataElements: [
          {
            dataType: 'member',
            label: 'Submitted By',
            data: proposal.createdBy,
          },
          {
            dataType: 'dataIndicator',
            label: 'Proposal Offering',
            data: `${proposal.proposalOffering} ${networkData?.symbol}`,
          },
        ],
        txHash: proposal.txHash,
      },
      {
        title: 'Waiting on Sponsor',
        active: false,
        canExpand: false,
      },
    ];
  }, [proposal, daochain]);

  if (!historyData) return null;

  return (
    <HistoryContainer>
      {historyData.map((element) => {
        return <ProposalHistoryCard element={element} />;
      })}
    </HistoryContainer>
  );
};
