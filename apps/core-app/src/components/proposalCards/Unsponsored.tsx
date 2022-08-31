import { isNumberish } from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
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

  const { dao } = useDao();
  const theme = useTheme();

  const hasShares = useMemo(() => {
    if (
      isNumberish(connectedMembership?.shares) &&
      isNumberish(dao?.sponsorThreshold)
    ) {
      return (
        Number(connectedMembership?.shares) > Number(dao?.sponsorThreshold)
      );
    }
    return false;
  }, [dao, connectedMembership]);

  return (
    <ActionTemplate
      statusDisplay="Needs A Sponsor"
      main={
        <div>
          <DummyBar />
          <GatedButton
            sm
            rules={[hasShares]}
            tooltipContent={PROP_CARD_HELP.UNSPONSORED}
          >
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
