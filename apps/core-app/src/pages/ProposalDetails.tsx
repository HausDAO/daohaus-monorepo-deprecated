import { useCallback, useEffect, useState } from 'react';
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
import { ProposalDetailsGuts } from '../components/ProposalDetailsGuts';
import { ProposalHistory } from '../components/ProposalHistory';
import { getProposalTypeLabel } from '../utils/general';
import { ProposalActions } from '../components/proposalCards/ProposalActions';

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
  height: 100%;
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

  const fetchProposal = useCallback(() => {
    const shouldUpdate = true;
    if (!daochain || !daoid || !proposalId) return;
    console.log('loading prop: shouldUpdate', shouldUpdate);
    loadProposal({
      daoid,
      daochain: daochain as keyof Keychain,
      proposalId,
      setProposal,
      setProposalLoading,
      shouldUpdate,
      connectedAddress: address,
    });
  }, [daochain, daoid, proposalId, address]);

  useEffect(() => {
    if (daochain && daoid && proposalId && address) {
      fetchProposal();
    }
  }, [daochain, daoid, proposalId, address, fetchProposal]);

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
          {proposal && <ProposalDetailsGuts proposal={proposal} />}
        </OverviewCard>
      }
      right={
        <RightCard>
          {proposal && <ProposalActions proposal={proposal} />}
          <ProposalHistory proposal={proposal} />
        </RightCard>
      }
    />
  );
}

export default ProposalDetails;
