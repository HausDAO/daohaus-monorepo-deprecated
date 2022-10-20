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
  Tooltip,
  ParSm,
} from '@daohaus/ui';
import {
  charLimit,
  formatShortDateTimeFromSeconds,
  Keychain,
} from '@daohaus/common-utilities';

import { TProposals } from '@daohaus/dao-context';
import { getProposalTypeLabel } from '../utils/general';
import { ITransformedProposal } from '@daohaus/dao-data';
import { RiTimeLine } from 'react-icons/ri';

const OverviewBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.1rem;
  height: 100%;
  .title {
    margin-bottom: 2rem;
  }
  .description {
    margin-bottom: auto;
  }
  @media ${widthQuery.md} {
    .description {
      margin-bottom: 2rem;
    }
  }
`;

const SubmittedContainer = styled.div`
  display: flex;

  margin-top: 2rem;
  .submitted-by {
    margin-right: 1rem;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
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
  const isMd = useBreakpoint(widthQuery.md);

  return (
    <OverviewBox>
      <OverviewHeader proposal={proposal} />
      <ParLg className="title">{proposal.title}</ParLg>
      <ParMd className="description" color={theme.tint.secondary}>
        {charLimit(proposal.description, 145)}
      </ParMd>
      {isMd && (
        <StyledLink
          href={`/molochV3/${daochain}/${daoid}/proposals/${proposal.proposalId}`}
        >
          <Button secondary sm fullWidth={isMobile} centerAlign>
            View Details
          </Button>
        </StyledLink>
      )}
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
    </OverviewBox>
  );
};

const OverviewContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media ${widthQuery.md} {
    align-items: center;
    margin-bottom: 2rem;
  }
`;

export const OverviewHeader = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
  const { daochain, daoid } = useParams();

  const theme = useTheme();
  const isMobile = useBreakpoint(widthQuery.md);
  return (
    <OverviewContainer>
      {isMobile ? (
        <>
          <ParSm color={theme.tint.secondary}>
            {getProposalTypeLabel(proposal.proposalType)}
          </ParSm>
          <Tooltip
            content={formatShortDateTimeFromSeconds(proposal.createdAt)}
            triggerEl={<RiTimeLine color={theme.secondary} size="1.6rem" />}
          />
        </>
      ) : (
        <>
          <ParSm color={theme.tint.secondary}>
            {getProposalTypeLabel(proposal.proposalType)} |{' '}
            {formatShortDateTimeFromSeconds(proposal.createdAt)}
          </ParSm>
          <StyledLink
            href={`/molochV3/${daochain}/${daoid}/proposals/${proposal.proposalId}`}
          >
            <Button secondary sm>
              View Details
            </Button>
          </StyledLink>
        </>
      )}
    </OverviewContainer>
  );
};
