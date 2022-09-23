import { useState, useCallback } from 'react';
import WalletConnect from '@walletconnect/client';
import { IClientMeta } from '@walletconnect/types';

const rejectWithMessage = (connector: WalletConnect, id: number, message: string) => {
  connector.rejectRequest({ id, error: { message } });
};

type WCParams = {
  chainId: string;
  safeAddress: string;
  session?: WalletConnect;
  uri: string;
};

type Tx = {
  data: string;
  from: string;
  gas: string;
  to: string;
  value: string;
  operation?: string;
};

type WCPayload = {
  id: number;
  jsonrpc: string;
  method: string;
  params: Array<Tx>;
};

export const useWalletConnect = (): {
  wcConnector?: WalletConnect;
  wcClientData?: IClientMeta;
  txPayload?: WCPayload,
  wcConnect: (params: WCParams) => Promise<void>,
  wcDisconnect: (session: WalletConnect) => Promise<void>;
} => {
  const [wcClientData, setWcClientData] = useState<IClientMeta>();
  const [txPayload, setTxPayload] = useState();
  const [wcConnector, setConnector] = useState<WalletConnect>();
  const [localStorageSessionKey, setLocalStorageSessionKey] = useState('');

  const wcDisconnect = useCallback(
    async (session: WalletConnect) => {
      try {
        await session.killSession();
      } catch (error) {
        console.log('Error trying to close WC session: ', error);
      } finally {
        setConnector(undefined);
        setWcClientData(undefined);
        localStorage.removeItem(localStorageSessionKey);
        setLocalStorageSessionKey('');
      }
    },
    [localStorageSessionKey],
  );

  const wcConnect = useCallback(
    async ({ chainId, safeAddress, session, uri }) => {
      console.log('wcConnect', chainId, safeAddress, session, uri);
      const connector = new WalletConnect({
        uri,
        session,
        storageId: `session_${safeAddress}`,
      });
      setConnector(connector);
      setWcClientData(connector.peerMeta || undefined);
      setLocalStorageSessionKey(`session_${safeAddress}`);

      connector.on('session_request', (error, payload) => {
        if (error) {
          throw error;
        }

        connector.approveSession({
          accounts: [safeAddress],
          chainId: Number(chainId),
        });

        setWcClientData(payload.params[0].peerMeta);
      });

      connector.on('call_request', async (error, payload) => {
        try {
          if (error) {
            throw error;
          }
          switch (payload.method) {
            case 'eth_sendTransaction': {
              setTxPayload(payload);
              break;
            }
            case 'personal_sign': {
              // TODO: use SafeSignLib to support signing using the Safe
              // const [message] = payload.params;
              // // TODO:
              // const tx = encodeSafeSignMessage(chainId, message);
              // setTxPayload({
              //   ...payload,
              //   params: [tx],
              // });
              break;
            }
            default: {
              rejectWithMessage(connector, payload.id, 'Tx type not supported');
              break;
            }
          }
        } catch (exception) {
          rejectWithMessage(connector, payload.id, (exception as Error).message);
        }
      });

      connector.on('disconnect', error => {
        if (error) {
          throw error;
        }
        setTxPayload(undefined);
        if (wcConnector) wcDisconnect(wcConnector);
      });
    },
    [wcConnector, wcDisconnect],
  );

  return {
    wcConnector,
    wcClientData,
    txPayload,
    wcConnect,
    wcDisconnect,
  };
};
