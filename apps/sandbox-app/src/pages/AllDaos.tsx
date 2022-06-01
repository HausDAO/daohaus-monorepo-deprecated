import React, { useEffect, useState } from 'react';
import { H3, H6, ParSm, Spinner } from '@daohaus/ui';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { Haus } from '@daohaus/dao-data';
import { extractKeychain, Keychain } from '@daohaus/common-utilities';
import { ListCard, PlainLink } from './Page.styles';

const AllDaos = () => {
  const { networks, chainId } = useHausConnect();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [daos, setDaos] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const rpcs = extractKeychain(networks, 'rpc');

      // SDK REFACTOR: look at how to align these types
      const networkIds = Object.keys(
        extractKeychain(networks, 'networkId')
      ) as string[];
      console.log('networkIds', networkIds);

      const haus = Haus.create(rpcs);
      // SDK REFACTOR: how to handle the potential unefined address
      const res = await haus.query.listDaos({
        networkId: chainId as keyof Keychain,
      });

      if (res?.data?.daos) {
        setDaos(res.data.daos);
      }

      setLoading(false);
    };

    if (chainId === '0x5' && networks) {
      fetchData();
    } else {
      console.log('connect to goerli');
    }
  }, [chainId, networks]);

  return (
    <>
      {loading && <Spinner />}
      {daos.length > 0 && <H3>All Goerli DAOs</H3>}
      {daos.map((dao) => {
        return (
          <PlainLink key={dao.id} to={`/dao/${chainId}/${dao.id}`}>
            <ListCard>
              <H6>{dao.id}</H6>
              <ParSm>{dao.name || 'No name dao'}</ParSm>
              <ParSm>Proposals: {dao.proposalCount}</ParSm>
              <ParSm>Members: {dao.activeMemberCount}</ParSm>

              {/* <ParSm>Voting Power: {dao.votingPower}%</ParSm> */}
            </ListCard>
          </PlainLink>
        );
      })}
      <PlainLink to={'/'}>View My DAOs</PlainLink>
    </>
  );
};

export default AllDaos;
