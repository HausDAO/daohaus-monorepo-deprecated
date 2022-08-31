import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import {
  BiColumnLayout,
  Card,
  SingleColumnLayout,
  Spinner,
  widthQuery,
} from '@daohaus/ui';
import { ITransformedProposalQuery } from '@daohaus/dao-data';
import { Keychain } from '@daohaus/common-utilities';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';

import { loadProposal } from '../utils/dataFetchHelpers';
import { ProposalDetailsOverview } from '../components/ProposalDetailsOverview';
import { ProposalTypeLabels, PROPOSAL_TYPE_LABELS } from '../utils/constants';
import { ProposalWarning } from '../components/ProposalWarning';
import { getProposalTypeLabel } from '../utils/general';

const OverviewCard = styled(Card)`
  width: 64rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

const RightCard = styled(Card)`
  width: 45.7rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export function ProposalDetails() {
  const { daoid, daochain, proposalId } = useParams();
  const { address } = useHausConnect();

  const [proposal, setProposal] = useState<
    ITransformedProposalQuery['proposal'] | undefined
  >();
  const [proposalLoading, setProposalLoading] = useState<boolean>(false);

  useEffect(() => {
    let shouldUpdate = true;
    if (daochain && daoid && proposalId) {
      loadProposal({
        daoid,
        daochain: daochain as keyof Keychain,
        proposalId,
        setProposal,
        setProposalLoading,
        shouldUpdate,
        connectedAddress: address,
      });
    }
    return () => {
      shouldUpdate = false;
    };
  }, [daochain, daoid, proposalId, address]);

  if (proposalLoading) {
    return (
      <SingleColumnLayout>
        <Spinner />
      </SingleColumnLayout>
    );
  }

  return (
    <BiColumnLayout
      title={proposal?.title}
      subtitle={getProposalTypeLabel(proposal?.proposalType)}
      left={
        <OverviewCard>
          {proposal && <ProposalDetailsOverview proposal={proposal} />}
        </OverviewCard>
      }
      right={<RightCard>actions</RightCard>}
    />
  );
}

export default ProposalDetails;
