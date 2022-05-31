import React, { useEffect, useState } from 'react';
import { H3, H6, ParSm, Spinner } from '@daohaus/ui';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { Haus, TransformedMembership } from '@daohaus/dao-data';
import { extractKeychain } from '@daohaus/common-utilities';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DaoListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
`;

const DaoCard = styled.div`
  padding: 2rem;
  margin: 0 1rem 1rem 0;
  border: 1px solid;
  border-radius: 5px;
`;

const PlainLink = styled(Link)`
  color: unset;
  text-decoration: unset;
`;

const Home = () => {
  const { address, networks } = useHausConnect();
  const [daos, setDaos] = useState([] as TransformedMembership[]);
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
      const res = await haus.query.listDaosByMember({
        memberAddress: address || '0x0',
        networkIds: ['0x5', '0x1'],
      });

      if (res?.data?.daos) {
        setDaos(res.data.daos);
      }

      setLoading(false);
    };

    if (address && networks) {
      fetchData();
    }
  }, [address, networks]);

  return (
    <>
      {loading && <Spinner />}
      {daos.length > 0 && <H3>Your daos</H3>}
      <DaoListContainer>
        {daos.map((dao) => {
          return (
            <PlainLink key={dao.dao} to={`/dao/${dao.networkId}/${dao.dao}`}>
              <DaoCard>
                <H6>{dao.dao}</H6>
                <ParSm>{dao.name || 'No name dao'}</ParSm>
                <ParSm>NetworkId: {dao.networkId}</ParSm>
                <ParSm>Voting Power: {dao.votingPower}%</ParSm>
              </DaoCard>
            </PlainLink>
          );
        })}
      </DaoListContainer>
    </>
  );
};

export default Home;
