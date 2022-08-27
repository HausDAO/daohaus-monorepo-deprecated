import { useEffect, useMemo, useState } from 'react';

import {
  Buildable,
  ErrorMessage,
  Field,
  SuccessMessage,
  WrappedTextArea,
} from '@daohaus/ui';
import { useDao } from '../contexts/DaoContext';
import { useParams } from 'react-router-dom';
import {
  ENDPOINTS,
  isValidNetwork,
  ReactSetter,
  ValidNetwork,
} from '@daohaus/common-utilities';

import { gql, request } from 'graphql-request';

enum FetchStatus {
  Idle,
  Fetching,
  Success,
  WrongNetwork,
  NoPubId,
  Error,
}
const query = gql`
  query getPubId($safeId: String!) {
    permissions(
      where: { address: "0xf52e0fa6858c745dfa0834a651977da463191f35" }
    ) {
      publication {
        id
      }
    }
  }
`;

const handleFetchPubId = async (
  safeId: string,
  chainId: ValidNetwork,
  setPubId: ReactSetter<string | null>,
  setFetchStatus: ReactSetter<FetchStatus>,
  shouldUpdate: boolean
) => {
  setFetchStatus(FetchStatus.Fetching);
  try {
    const subgraphUrl = ENDPOINTS.TABULA_GRAPH[chainId];

    if (!subgraphUrl) {
      setFetchStatus(FetchStatus.WrongNetwork);
      throw new Error(`No subgraph endpoint found for chainID: ${chainId}`);
    }
    const result = await request(subgraphUrl, query, {
      safeId,
    });
    const pubId = result?.permissions?.[0]?.publication?.id;
    if (!shouldUpdate) return;
    if (pubId) {
      setPubId(pubId as string);
      setFetchStatus(FetchStatus.Success);
      return;
    }
    setFetchStatus(FetchStatus.NoPubId);
    throw new Error(`No PubId found for safe address: ${safeId}`);
  } catch (e) {
    console.error(e);
    if (!shouldUpdate) return;
    setFetchStatus(FetchStatus.Error);
    setPubId(null);
  }
};

export const FakeMarkdown = (props: Buildable<Field>) => {
  const [pubId, setPubId] = useState<null | string>(null);
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const { dao } = useDao();
  const { daochain } = useParams();

  useEffect(() => {
    let shouldUpdate = true;

    if (dao && isValidNetwork(daochain)) {
      handleFetchPubId(
        dao.safeAddress,
        daochain,
        setPubId,
        setFetchStatus,
        shouldUpdate
      );
    }
    return () => {
      shouldUpdate = false;
    };
  }, [dao, daochain]);

  const helperText =
    fetchStatus === FetchStatus.Idle || fetchStatus === FetchStatus.Fetching
      ? 'Loading...'
      : undefined;

  const successText =
    fetchStatus === FetchStatus.Success
      ? ({
          type: 'success',
          message: `Tabula PubID Found`,
        } as SuccessMessage)
      : undefined;

  const errorText = (): ErrorMessage | undefined => {
    if (FetchStatus.Error === fetchStatus) {
      return { type: 'error', message: 'Error fetching PubId' };
    }
    if (FetchStatus.NoPubId === fetchStatus) {
      return { type: 'error', message: 'No PubId found for this safe address' };
    }
    if (FetchStatus.WrongNetwork === fetchStatus) {
      return {
        type: 'error',
        message: 'Tabula Graph endpoint not found for this chain',
      };
    }
    return undefined;
  };

  return (
    <WrappedTextArea
      {...props}
      disabled={!pubId}
      placeholder="Oh, no-no."
      helperText={helperText}
      error={errorText()}
      success={successText}
    />
  );
};
