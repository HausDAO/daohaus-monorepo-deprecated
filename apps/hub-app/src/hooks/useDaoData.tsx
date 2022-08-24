import { useEffect, useState } from 'react';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { Haus, ITransformedMembership } from '@daohaus/dao-data';
import { NETWORK_DATA, ValidNetwork } from '@daohaus/common-utilities';

const temporaryInitHaus = () => {
  return Haus.create();
};

const useDaoData = () => {
  const { address } = useHausConnect();
  const [loading, setLoading] = useState(true);

  const [daoData, setDaoData] = useState<ITransformedMembership[]>([]);

  const [filterNetworks] = useState<Record<string, string>>(
    Object.keys(NETWORK_DATA).reduce(
      (acc, networkId) => ({ [networkId]: networkId }),
      {}
    )
  );

  useEffect(() => {
    let shouldUpdate = true;
    const getDaos = async (address: string) => {
      setLoading(true);
      try {
        const haus = temporaryInitHaus();
        const query = await haus.profile.listDaosByMember({
          memberAddress: address,
          networkIds: Object.keys(filterNetworks) as ValidNetwork[],
          includeTokens: true,
          // TODO: add delegate filter
        });

        if (query.data?.daos && shouldUpdate) {
          setDaoData(query.data.daos);
        }
      } catch (error) {
        error instanceof Error
          ? console.error(error.message)
          : console.error('Well, shit...');
      } finally {
        setLoading(false);
      }
    };

    if (!address || !shouldUpdate) return;

    getDaos(address);

    return () => {
      shouldUpdate = false;
    };
  }, [address, filterNetworks]);
  return { daoData, isLoadingDaoData: loading };
};

export default useDaoData;
