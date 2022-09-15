import React from 'react';

import {
  Buildable,
  WrappedInput,
  Field,
  ParMd,
  DataMd,
  Button,
  font,
  ParSm,
  Theme,
  Tooltip,
} from '@daohaus/ui';
import { useConnectedMembership, useDao } from '@daohaus/dao-context';
import {
  formatValueTo,
  fromWei,
  votingPowerPercentage,
} from '@daohaus/common-utilities';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

const RemoveDelegate = styled(ParSm)`
  margin-top: 3rem;
  :hover {
    cursor: pointer;
    color: ${({ theme }: { theme: Theme }) => theme.link.color};
  }
`;

// TODO DIDN'T REFRESH

export const DelegateInput = (props: Buildable<Field>) => {
  const { connectedMembership } = useConnectedMembership();
  const { dao } = useDao();
  const { setValue } = useFormContext();

  const hasCurrentDelegate =
    connectedMembership?.delegatingTo !== connectedMembership?.memberAddress;

  const handleRemoveDelegate = () => {
    setValue(props.id, connectedMembership?.memberAddress);
  };

  return (
    <>
      <WrappedInput {...props} />
      <ParMd>Voting token to delegate</ParMd>
      <DataMd>{`${dao?.shareTokenName} (${formatValueTo({
        value: fromWei(connectedMembership?.shares || '0'),
        decimals: 2,
        format: 'number',
      })} - ${votingPowerPercentage(
        dao?.totalShares || '0',
        connectedMembership?.shares || '0'
      )}% voting power) `}</DataMd>
      {hasCurrentDelegate && (
        <RemoveDelegate onClick={handleRemoveDelegate}>
          Remove Existing Delegate
          <Tooltip content="Will reset the delegate address to your own. Then you can submit the transaction to update." />
        </RemoveDelegate>
      )}
    </>
  );
};
