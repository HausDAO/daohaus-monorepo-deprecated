import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { H3, H6, ParSm, Spinner } from '@daohaus/ui';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import {
  extractKeychain,
  Keychain,
  formatDateTimeFromSeconds,
} from '@daohaus/common-utilities';
// import { Haus, Member as IMember } from '@daohaus/dao-data';
import { Haus } from '@daohaus/dao-data';

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
`;

const ListCard = styled.div`
  padding: 2rem;
  margin: 0 1rem 1rem 0;
  border: 1px solid;
  border-radius: 5px;
`;

// SDK REFACTOR: Should we add vote power?

const Members = () => {
  const { networks } = useHausConnect();
  const { daochain, daoid } = useParams();
  const [loading, setLoading] = useState(false);

  // SDK REFACTOR: examples of best practice and easy to use types from the sdk
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [members, setMembers] = useState([] as any[]);
  // const [members, setMembers] = useState([] as Partial<IMember>[]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const rpcs = extractKeychain(networks, 'rpc');

      const haus = Haus.create(rpcs);
      // SDK REFACTOR: how to handle the potential unefined daoid and is it ok to force the type on daochain?
      const res = await haus.query.listMembers({
        networkId: daochain as keyof Keychain,
        filter: { dao: daoid },
      });
      if (res?.data?.members) {
        // SDK REFACTOR: these types on subqueries are a nightmare whe mataData was in there
        setMembers(res.data.members);
      }

      setLoading(false);
    };

    if (networks) {
      fetchData();
    }
  }, [networks, daochain, daoid]);

  return (
    <>
      {loading && <Spinner />}
      {members.length > 0 && <H3>{members.length} members</H3>}

      {members.map((member) => {
        return (
          <ListCard key={member.id}>
            <H6>{member.memberAddress}</H6>
            <ParSm>Shares: {member.shares}</ParSm>
            <ParSm>Loot: {member.loot}</ParSm>
            <ParSm>Vote Count: {member.votes.length}</ParSm>

            <ParSm>
              Joined on: {formatDateTimeFromSeconds(member.createdAt)}
            </ParSm>
            {member.delegatingTo !== member.memberAddress && (
              <ParSm>Delegating to: {member.delegatingTo}</ParSm>
            )}
          </ListCard>
        );
      })}
    </>
  );
};

export default Members;
