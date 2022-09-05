import {
  fromWei,
  isValidNetwork,
  NETWORK_DATA,
} from '@daohaus/common-utilities';
import { useConnectedMembership, useDao } from '@daohaus/dao-context';
import { Buildable, ParMd, TintSecondary } from '@daohaus/ui';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const ProposalOffering = (props: Buildable<{ id?: string }>) => {
  const { id = 'proposalOffering' } = props;
  const { daochain } = useParams();
  const { dao } = useDao();
  const { connectedMembership } = useConnectedMembership();
  const { setValue } = useFormContext();
  const [requiresOffering, setRequiresOffering] = useState(false);

  const networkTokenSymbol =
    isValidNetwork(daochain) && NETWORK_DATA[daochain]?.symbol;

  useEffect(() => {
    if (!dao || !id) return;

    if (
      !connectedMembership ||
      dao.proposalOffering > connectedMembership.shares
    ) {
      setRequiresOffering(true);
      setValue(id, dao.proposalOffering);
      return;
    }

    setValue(id, '');
    setRequiresOffering(false);
    return;
  }, [dao, connectedMembership, setValue, id]);

  if (!requiresOffering || !dao?.proposalOffering || !networkTokenSymbol)
    return null;

  return (
    <ParMd>
      Proposal Offering:{' '}
      <TintSecondary>
        {' '}
        {fromWei(dao.proposalOffering)} {networkTokenSymbol}
      </TintSecondary>
    </ParMd>
  );
};
