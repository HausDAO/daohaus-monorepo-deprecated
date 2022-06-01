import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { H3, H6, ParSm, Spinner } from '@daohaus/ui';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { extractKeychain, Keychain } from '@daohaus/common-utilities';
import { Haus } from '@daohaus/dao-data';
import { ListCard } from './Page.styles';

const Vault = () => {
  const { networks } = useHausConnect();
  const { daochain, daoid, safeaddress } = useParams();
  const [loading, setLoading] = useState(false);

  // SDK REFACTOR: examples of best practice and easy to use types from the sdk
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tokenBalances, setTokenBalances] = useState([] as any[]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const rpcs = extractKeychain(networks, 'rpc');

      const haus = Haus.create(rpcs);
      // SDK REFACTOR: how to handle the potential unefined daoid and is it ok to force the type on daochain?
      const res = await haus.query.listTokenBalances({
        networkId: daochain as keyof Keychain,
        safeAddress: safeaddress || '0x0',
      });
      if (res?.data?.tokenBalances) {
        // SDK REFACTOR: these types on subqueries are a nightmare whe mataData was in there
        setTokenBalances(res.data.tokenBalances);
      }

      setLoading(false);
    };

    if (networks) {
      fetchData();
    }
  }, [networks, daochain, daoid, safeaddress]);

  console.log('tokenBalances', tokenBalances);

  return (
    <>
      {loading && <Spinner />}
      {!loading && <H3>{tokenBalances.length} token balances</H3>}

      {tokenBalances.map((bal, i) => {
        return (
          <ListCard key={i}>
            <H6>{bal.tokenAddress || '0x0'}</H6>
            <ParSm>{bal.token?.name || 'network token'}</ParSm>
            <ParSm>
              Balance:{' '}
              {bal.balance !== '0'
                ? Number(bal.balance) / 10 ** bal.token.decimals
                : bal.balance}
            </ParSm>
            <ParSm>USD Balance: {bal.fiatBalance}</ParSm>
          </ListCard>
        );
      })}
    </>
  );
};

export default Vault;
