import {
  handleErrorMessage,
  isNumberish,
  TXLego,
} from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useTxBuilder } from '@daohaus/tx-builder-feature';
import { Italic, ParSm, Spinner, useToast } from '@daohaus/ui';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useConnectedMembership, useDao } from '../../contexts/DaoContext';
import { PROP_CARD_HELP } from '../../data/copy';
import { ACTION_TX } from '../../legos/tx';
import { VotingBar } from '../VotingBar';
import { ActionTemplate } from './ActionPrimitives';
import { GatedButton } from './GatedButton';

export const Unsponsored = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
  const { daochain } = useParams();
  const { fireTransaction } = useTxBuilder();
  const { connectedMembership } = useConnectedMembership();
  const { chainId } = useHausConnect();
  const { errorToast, defaultToast, successToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const { dao, refreshAll } = useDao();
  const theme = useTheme();

  const handleSponsor = () => {
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

  const hasShares = useMemo(() => {
    if (
      isNumberish(connectedMembership?.shares) &&
      isNumberish(dao?.sponsorThreshold)
    ) {
      return Number(connectedMembership?.shares) > Number(dao?.sponsorThreshold)
        ? true
        : PROP_CARD_HELP.UNSPONSORED;
    }
    return 'Subgraph data not loading or is not in sync';
  }, [dao, connectedMembership]);

  const isConnectedToDao =
    chainId === daochain
      ? true
      : 'You are not connected to the same network as the DAO';

  return (
    <ActionTemplate
      statusDisplay="Needs A Sponsor"
      main={
        <div>
          <VotingBar proposal={proposal} />
          <GatedButton
            sm
            rules={[hasShares, isConnectedToDao]}
            onClick={handleSponsor}
            centerAlign
          >
            {isLoading ? (
              <Spinner size="2rem" strokeWidth=".2rem" />
            ) : (
              'Sponsor Proposal'
            )}
          </GatedButton>
        </div>
      }
      helperDisplay={
        <ParSm color={theme.tint.secondary}>
          <Italic>{PROP_CARD_HELP.UNSPONSORED}</Italic>
        </ParSm>
      }
    />
  );
};
