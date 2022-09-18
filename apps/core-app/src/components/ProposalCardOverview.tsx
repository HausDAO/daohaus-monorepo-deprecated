import { useParams } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import {
  AddressDisplay,
  Button,
  ParLg,
  ParMd,
  Link,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';
import {
  charLimit,
  formatShortDateTimeFromSeconds,
  Keychain,
} from '@daohaus/common-utilities';

import { TProposals } from '@daohaus/dao-context';
import { getProposalTypeLabel } from '../utils/general';

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.1rem;
  height: 100%;
  .title {
    margin-bottom: 1.2rem;
  }
  .description {
    margin-bottom: auto;
  }
  @media ${widthQuery.sm} {
    .title {
      font-size: 2.2rem;
      margin-bottom: 2rem;
    }
    .description {
      margin-bottom: 0;
    }
  }
`;

const OverviewHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media ${widthQuery.sm} {
    .overview {
      font-size: 1.4rem;
      margin-bottom: 1.2rem;
    }
  }
`;

const SubmittedContainer = styled.div`
  display: flex;

  margin-top: 2.1rem;
  .submitted-by {
    margin-right: 1rem;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
    margin-bottom: 2rem;
  }
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
  const theme = useTheme();
  const isMobile = useBreakpoint(widthQuery.sm);
  return (
    <OverviewContainer>
      <OverviewHeader>
        <ParMd color={theme.tint.secondary} className="overview">
          {getProposalTypeLabel(proposal.proposalType)} |{' '}
          {formatShortDateTimeFromSeconds(proposal.createdAt)}
        </ParMd>
        {isMobile || (
          <StyledLink
            href={`/molochV3/${daochain}/${daoid}/proposals/${proposal.proposalId}`}
          >
            <Button secondary sm>
              View Details
            </Button>
          </StyledLink>
        )}
      </OverviewHeader>
      <ParLg className="title">{proposal.title}</ParLg>
      <ParMd className="description" color={theme.tint.secondary}>
        {charLimit(proposal.description, 145)}
      </ParMd>
      <SubmittedContainer>
        <ParMd color={theme.tint.secondary} className="submitted-by">
          Submitted by:{' '}
        </ParMd>
        <AddressDisplay
          truncate
          address={proposal.createdBy}
          copy
          explorerNetworkId={daochain as keyof Keychain}
        />
      </SubmittedContainer>
      {isMobile && (
        <StyledLink
          href={`/molochV3/${daochain}/${daoid}/proposals/${proposal.proposalId}`}
        >
          <Button secondary sm>
            View Details
          </Button>
        </StyledLink>
      )}
    </OverviewContainer>
  );
};
