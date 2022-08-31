import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AddressDisplay, Button, ParLg, ParMd, Link } from '@daohaus/ui';
import {
  charLimit,
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

const StyledLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`;

type ProposalCardOverviewProps = {
  proposal: TProposals[number];
};

export const ProposalCardOverview = ({
  proposal,
}: ProposalCardOverviewProps) => {
  const { daochain, daoid } = useParams();

  return (
    <OverviewContainer>
      <OverviewHeader>
        <ParMd>
          {proposal.proposalType} |{' '}
          {formatShortDateTimeFromSeconds(proposal.createdAt)}
        </ParMd>
        <StyledLink
          href={`/molochV3/${daochain}/${daoid}/proposals/${proposal.proposalId}`}
        >
          <Button secondary>View Details</Button>
        </StyledLink>
      </OverviewHeader>
      <ParLg color="white">{proposal.title}</ParLg>
      <ParLg color="white">{proposal.proposalId}</ParLg>

      <ParMd>{charLimit(proposal.description, 145)}</ParMd>
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
