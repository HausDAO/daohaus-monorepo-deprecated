import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  AddressDisplay,
  ParMd,
  Link,
  Theme,
  border,
  DataIndicator,
} from '@daohaus/ui';
import {
  formatShortDateTimeFromSeconds,
  Keychain,
} from '@daohaus/common-utilities';

import { TProposals } from '../contexts/DaoContext';
import { ProposalWarning } from './ProposalWarning';

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  padding: 2.8rem 3.6rem;
  border-radius: ${border.radius};
  border: 1px ${({ theme }: { theme: Theme }) => theme.card.border} solid;
  background-color: ${({ theme }: { theme: Theme }) => theme.card.hoverBg};
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3rem;
`;

const SpacedAddressDisplay = styled(AddressDisplay)`
  margin-top: 1rem;
`;

const Spacer = styled.div`
  margin-bottom: 2rem;
`;

type ProposalDetailsOverviewProps = {
  proposal: TProposals[number];
};

export const ProposalDetailsOverview = ({
  proposal,
}: ProposalDetailsOverviewProps) => {
  const { daochain } = useParams();

  return (
    <OverviewContainer>
      <ParMd>{proposal.description}</ParMd>
      {proposal.contentURI && (
        <Link href={proposal.contentURI} linkType="external">
          Link
        </Link>
      )}
      <DataContainer>
        <div>
          <ParMd>Submitted by</ParMd>
          <SpacedAddressDisplay
            truncate
            address={proposal.createdBy}
            copy
            explorerNetworkId={daochain as keyof Keychain}
          />
        </div>
        <DataIndicator
          label="Expiration Date"
          data={
            +proposal.expiration
              ? formatShortDateTimeFromSeconds(proposal.expiration)
              : '--'
          }
          size="sm"
        />
      </DataContainer>
      <Spacer />
      <ProposalWarning
        proposalType={proposal.proposalType}
        decodeError={false}
        txHash={proposal.txHash}
      />
    </OverviewContainer>
  );
};
