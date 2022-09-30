import {
  handleErrorMessage,
  isValidNetwork,
  NETWORK_DATA,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { Haus, ITransformedMembership } from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { H1, useDebounce, useToast } from '@daohaus/ui';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { HomeDashboard } from '../components/HomeDashboard';
import { HomeNotConnected } from '../components/HomeNotConnected';
import { getDelegateFilter, SORT_FIELDS } from '../utils/hub';

const defaultNetworks = Object.keys(NETWORK_DATA).reduce(
  (acc, networkId) => ({ ...acc, [networkId]: networkId }),
  {}
);
export const DEFAULT_SORT_KEY = 'PROPOSALS';

export function Home() {
  const { isConnected, address } = useHausConnect();
  const { errorToast } = useToast();
  const [daoData, setDaoData] = useState<ITransformedMembership[]>([]);
  const [filterNetworks, setFilterNetworks] =
    useState<Record<string, string>>(defaultNetworks);
  const [filterDelegate, setFilterDelegate] = useState<string | ''>('');
  const [sortBy, setSortBy] = useState<string>(DEFAULT_SORT_KEY);
  const [searchTerm, setSearchTerm] = useState<string | ''>('');
  const [loading, setLoading] = useState<boolean>(true);

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000);

  useEffect(() => {
    const shouldUpdate = true;
    // const getDaos = async (address: string) => {
    //   setLoading(true);
    //   try {
    //     const haus = Haus.create();
    //     const query = await haus.profile.listDaosByMember({
    //       memberAddress: address,
    //       networkIds: Object.keys(filterNetworks) as ValidNetwork[],
    //       includeTokens: true,
    //       daoFilter: { name_contains_nocase: debouncedSearchTerm },
    //       memberFilter: getDelegateFilter(filterDelegate, address),
    //       ordering: SORT_FIELDS[sortBy].ordering,
    //     });

    //     if (query.data?.daos && shouldUpdate) {
    //       setDaoData(query.data.daos);
    //     }
    //   } catch (error) {
    //     const errMsg = handleErrorMessage({
    //       error,
    //       fallback: 'Error loading DAOs',
    //     });

    //     errorToast({ title: 'Error', description: errMsg });
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // if (!address) return;
    // getDaos(address);

    // return () => {
    //   shouldUpdate = false;
    // };
  }, [
    address,
    filterNetworks,
    filterDelegate,
    sortBy,
    debouncedSearchTerm,
    errorToast,
  ]);

  const toggleNetworkFilter = (event: MouseEvent<HTMLButtonElement>) => {
    const network = event.currentTarget.value;
    if (network && isValidNetwork(network)) {
      filterNetworks[network]
        ? setFilterNetworks((prevState) => {
            delete prevState[network];
            return { ...prevState };
          })
        : setFilterNetworks((prevState) => ({
            ...prevState,
            [network]: network,
          }));
    }
  };
  const toggleDelegateFilter = (event: MouseEvent<HTMLButtonElement>) => {
    setFilterDelegate((prevState) =>
      prevState === event.currentTarget.value ? '' : event.currentTarget.value
    );
  };
  const switchSortBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm((prevState) =>
      prevState === event.target.value ? '' : event.target.value
    );
  };

  return isConnected ? <HomeDashboard /> : <HomeNotConnected />;
}

export default Home;
