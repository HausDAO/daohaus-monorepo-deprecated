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

const testData: DecodedMultiTX = [
  {
    name: 'doThing',
    value: '0',
    to: '0x000000000000cd17345801aa8147b8d3950260ff',
    params: [
      {
        name: 'thisArg',
        value: '0x000000000000cd17345801aa8147b8d3950260ff',
        type: 'address',
      },
      {
        name: 'thatArg',
        value: [
          '0x000000000000cd17345801aa8147b8d3950260ff',
          '0x000000000000cd17345801aa8147b8d3950260ff',
          '0x000000000000cd17345801aa8147b8d3950260ff',
        ],
        type: 'address',
      },
      {
        name: 'thisToo',
        value: false,
        type: 'address',
      },
    ],
  },
  {
    error: true,
    message: 'Could not find a matching function for the given data',
    data: '0x0ae1b13d000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000006b7b227469746c65223a224e6f742061206d656d626572222c226465736372697074696f6e223a22736466222c22636f6e74656e74555249223a22222c22636f6e74656e7455524954797065223a2275726c222c2270726f706f73616c54797065223a225349474e414c227d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001f64616f686175732e70726f706f73616c2e7369676e616c50726f706f73616c00',
  },
];

export function ProposalDetails() {
  const { daoid, daochain, proposalId } = useParams();
  const { address } = useHausConnect();

  const [proposal, setProposal] = useState<
    ITransformedProposalQuery['proposal'] | undefined
  >();
  const [proposalLoading, setProposalLoading] = useState<boolean>(false);
  const [actionData, setActionData] = useState<DecodedMultiTX | null>();
  const [displayActions, setDisplayActions] = useState<boolean>(false);

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
          {actionData && <ActionDisplay actions={testData} />}
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
