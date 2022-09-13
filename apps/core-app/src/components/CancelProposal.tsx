import {
  handleErrorMessage,
  isGovernor,
  isNumberish,
  PROPOSAL_STATUS,
  TXLego,
} from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useTxBuilder } from '@daohaus/tx-builder-feature';
import { Italic, ParSm, Spinner, useToast } from '@daohaus/ui';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useConnectedMembership, useDao } from '@daohaus/dao-context';
import { PROP_CARD_HELP } from '../data/copy';
import { ACTION_TX } from '../legos/tx';
import { VotingBar } from './VotingBar';
import { GatedButton } from './proposalCards/GatedButton';

export const CancelProposal = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
  const { daochain } = useParams();
  const { fireTransaction } = useTxBuilder();
  const { connectedMembership } = useConnectedMembership();
  const { chainId, address } = useHausConnect();
  const { errorToast, defaultToast, successToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const { dao, refreshAll } = useDao();
  const theme = useTheme();

  const handleCancel = () => {
    const { proposalId } = proposal;

    if (!proposalId) return;
    setIsLoading(true);
    fireTransaction({
      tx: { ...ACTION_TX.SPONSOR, staticArgs: [proposalId] } as TXLego,
      lifeCycleFns: {
        onTxError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: 'Sponsor Failed', description: errMsg });
          setIsLoading(false);
        },
        onTxSuccess: () => {
          defaultToast({
            title: 'Sponsor Success',
            description: 'Please wait for subgraph to sync',
          });
        },
        onPollError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: 'Poll Error', description: errMsg });
          setIsLoading(false);
        },
        onPollSuccess: () => {
          successToast({
            title: 'Sponsor Success',
            description: 'Proposal sponsored',
          });
          setIsLoading(false);
          refreshAll();
        },
      },
    });
  };

  const isConnectedToDao =
    chainId === daochain
      ? true
      : 'You are not connected to the same network as the DAO';

  const addressCanCancel = useMemo(() => {
    const isProposer =
      proposal.createdBy.toLowerCase() === address?.toLowerCase();

    console.log('isProposer', isProposer);

    const sponsorBelowThreshold =
      Number(proposal.sponsorMembership?.shares) <
      Number(dao?.sponsorThreshold);

    console.log('sponsorBelowThreshold', sponsorBelowThreshold);

    const isGovernorShaman = dao?.shamen?.some((shaman) => {
      return (
        shaman.shamanAddress.toLowerCase() === address?.toLowerCase() &&
        isGovernor(shaman.permissions)
      );
    });

    console.log('isGovernorShaman', isGovernorShaman);

    return isProposer || sponsorBelowThreshold || isGovernorShaman
      ? true
      : `Proposal can only be cancelled by the proposer, by a governance shaman or if the sponsor's shares have fallen below the sponsor threshold`;
  }, [proposal, address, dao]);

  if (proposal.status !== PROPOSAL_STATUS.voting) {
    return null;
  }

  return (
    <GatedButton
      sm
      rules={[isConnectedToDao, addressCanCancel]}
      onClick={handleCancel}
      centerAlign
    >
      {isLoading ? <Spinner size="2rem" strokeWidth=".2rem" /> : 'Cancel'}
    </GatedButton>
  );
};
