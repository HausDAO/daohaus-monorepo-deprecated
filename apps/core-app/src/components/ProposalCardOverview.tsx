import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AddressDisplay, Button, ParLg, ParMd } from '@daohaus/ui';
import {
  formatShortDateTimeFromSeconds,
  Keychain,
} from '@daohaus/common-utilities';

import { TProposals } from '../contexts/DaoContext';

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const OverviewHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const SubmittedContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2.1rem;
`;

type ProposalCardOverviewProps = {
  proposal: TProposals[number];
};

export const ProposalCardOverview = ({
  proposal,
}: ProposalCardOverviewProps) => {
  const { daochain } = useParams();

  return (
    <OverviewContainer>
      <OverviewHeader>
        <ParMd>
          {proposal.proposalType} |{' '}
          {formatShortDateTimeFromSeconds(proposal.createdAt)}
        </ParMd>
        <Button secondary>View Details</Button>
      </OverviewHeader>
      <ParLg color="white">{proposal.title}</ParLg>
      <ParMd>{proposal.description}</ParMd>
      <SubmittedContainer>
        <ParMd>Submitted by</ParMd>
        <AddressDisplay
          truncate
          address={proposal.createdBy}
          copy
          explorerNetworkId={daochain as keyof Keychain}
        />
      </SubmittedContainer>
    </OverviewContainer>
  );
};
