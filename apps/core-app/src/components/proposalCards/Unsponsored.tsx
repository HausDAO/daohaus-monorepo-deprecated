import { isNumberish } from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useTxBuilder } from '@daohaus/tx-builder-feature';
import { Button, Italic, ParSm } from '@daohaus/ui';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useConnectedMembership, useDao } from '../../contexts/DaoContext';
import { PROP_CARD_HELP } from '../../data/copy';
import { ActionTemplate, DummyBar } from './ActionPrimitives';
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

  const { dao } = useDao();
  const theme = useTheme();

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
          <DummyBar />
          <GatedButton sm rules={[hasShares, isConnectedToDao]}>
            Sponsor Proposal
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
