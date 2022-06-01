import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { H3, H6, ParSm, Spinner } from '@daohaus/ui';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { extractKeychain, Keychain } from '@daohaus/common-utilities';
import { Haus } from '@daohaus/dao-data';
import { ListCard, PlainLink } from './Page.styles';

const Proposals = () => {
  const { networks } = useHausConnect();
  const { daochain, daoid } = useParams();
  const [loading, setLoading] = useState(false);

  // SDK REFACTOR: examples of best practice and easy to use types from the sdk
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [proposals, setProposals] = useState([] as any[]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const rpcs = extractKeychain(networks, 'rpc');

      const haus = Haus.create(rpcs);
      // SDK REFACTOR: how to handle the potential unefined daoid and is it ok to force the type on daochain?
      const res = await haus.query.listProposals({
        networkId: daochain as keyof Keychain,
        filter: { dao: daoid },
      });
      if (res?.data?.proposals) {
        // SDK REFACTOR: these types on subqueries are a nightmare whe mataData was in there
        setProposals(res.data.proposals);
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
      {!loading && <H3>{proposals.length} proposals</H3>}

      {proposals.map((proposal) => {
        return (
          <PlainLink
            key={proposal.id}
            to={`/dao/${daochain}/${daoid}/proposals/${proposal.proposalId}`}
          >
            <ListCard>
              <H6>Proposal #{proposal.proposalId}</H6>
              <ParSm>Name: {proposal.name || '- -'}</ParSm>
              <ParSm>Type: {proposal.type || '- -'}</ParSm>
              <ParSm>Status: {proposal.status}</ParSm>
            </ListCard>
          </PlainLink>
        );
      })}
    </>
  );
};

export default Proposals;
