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
import {
  isValidNetwork,
  Keychain,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';

import { loadProposal } from '../utils/dataFetchHelpers';
import { ProposalDetailsGuts } from '../components/ProposalDetailsGuts';
import { ProposalHistory } from '../components/ProposalHistory';
import { getProposalTypeLabel } from '../utils/general';
import { ProposalActions } from '../components/proposalCards/ProposalActions';
import { CancelProposal } from '../components/CancelProposal';
import {
  DecodedMultiTX,
  decodeProposalActions,
} from '@daohaus/tx-builder-feature';
import { ActionDisplay } from '../components/ActionDisplay';

// generate a random hex string that is 900 characters long

const OverviewCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 64rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  height: fit-content;
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

const ActionContainer = styled.div`
  padding: 0rem 3.6rem;
`;

export function ProposalDetails() {
  const { daoid, daochain, proposalId } = useParams();
  const { address } = useHausConnect();

  const [proposal, setProposal] = useState<
    ITransformedProposalQuery['proposal'] | undefined
  >();
  const [proposalLoading, setProposalLoading] = useState<boolean>(false);
  const [actionData, setActionData] = useState<DecodedMultiTX | null>();

  const fetchProposal = useCallback(() => {
    const shouldUpdate = true;
    if (!daochain || !daoid || !proposalId) return;
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
    if (daochain && daoid && proposalId) {
      fetchProposal();
    }
  }, [daochain, daoid, proposalId, address, fetchProposal]);

  useEffect(() => {
    let shouldUpdate = true;
    const fetchPropActions = async (
      chainId: ValidNetwork,
      actionData: string
    ) => {
      const proposalActions = await decodeProposalActions({
        chainId,
        actionData,
      });
      if (shouldUpdate) {
        setActionData(proposalActions);
      }
    };

    if (!isValidNetwork(daochain) || !proposal) return;
    fetchPropActions(daochain, proposal.proposalData);

    return () => {
      shouldUpdate = false;
    };
  }, [daochain, proposal]);

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
      actions={
        proposal && (
          <CancelProposal proposal={proposal} onSuccess={fetchProposal} />
        )
      }
      left={
        <OverviewCard>
          {proposal && <ProposalDetailsGuts proposal={proposal} />}
          {actionData && (
            <ActionContainer>
              <ActionDisplay actions={actionData} />
            </ActionContainer>
          )}
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
