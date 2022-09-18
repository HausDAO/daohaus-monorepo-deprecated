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
    <OverviewBox>
      <OverviewHeader proposal={proposal} isMobile={isMobile} />
      <ParLg className="title">{proposal.title}</ParLg>
      <ParMd className="description" color={theme.tint.secondary}>
        {charLimit(proposal.description, 145)}
      </ParMd>
      {isMobile || (
        <StyledLink
          href={`/molochV3/${daochain}/${daoid}/proposals/${proposal.proposalId}`}
        >
          <Button secondary sm fullWidth centerAlign>
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
      {isMobile && (
        <StyledLink
          href={`/molochV3/${daochain}/${daoid}/proposals/${proposal.proposalId}`}
        >
          <Button secondary sm>
            View Details
          </Button>
        </StyledLink>
      )}
    </OverviewBox>
  );
};

const OverviewContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media ${widthQuery.sm} {
    align-items: center;
    margin-bottom: 2rem;
  }
`;

export const OverviewHeader = ({
  isMobile,
  proposal,
}: {
  isMobile: boolean;
  proposal: ITransformedProposal;
}) => {
  const theme = useTheme();
  return (
    <OverviewContainer>
      {isMobile ? (
        <>
          <ParMd>{getProposalTypeLabel(proposal.proposalType)}</ParMd>
          <Tooltip
            content={formatShortDateTimeFromSeconds(proposal.createdAt)}
            triggerEl={<RiTimeLine color={theme.secondary} size="1.6rem" />}
          />
        </>
      ) : (
        <ParMd color={theme.tint.secondary}>
          {getProposalTypeLabel(proposal.proposalType)}
          {formatShortDateTimeFromSeconds(proposal.createdAt)}
        </ParMd>
      )}
    </OverviewContainer>
  );
};
