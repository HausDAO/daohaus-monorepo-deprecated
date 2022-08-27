import React, { useEffect, useState } from 'react';

import { Buildable, Field, WrappedTextArea } from '@daohaus/ui';
import { useDao } from '../contexts/DaoContext';
import { useParams } from 'react-router-dom';
import {
  isValidNetwork,
  ReactSetter,
  ValidNetwork,
} from '@daohaus/common-utilities';

enum FetchStatus {
  Idle,
  Fetching,
  Success,
  Error,
}

const handleFetchPubId = async (
  safeId: string,
  chainId: ValidNetwork,
  setPubId: ReactSetter<string | null>,
  setFetchStatus: ReactSetter<FetchStatus>
) => {};

export const FakeMarkdown = (props: Buildable<Field>) => {
  const [pubId, setPubId] = useState('');
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const { dao } = useDao();
  const { daochain } = useParams();

  useEffect(() => {
    if (dao && isValidNetwork(daochain)) {
    }
  }, [dao, daochain]);

  return (
    <WrappedTextArea {...props} disabled={!pubId} placeholder="Oh, no-no." />
  );
};
