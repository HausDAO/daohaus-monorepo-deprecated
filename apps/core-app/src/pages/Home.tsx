import { NETWORK_DATA } from '@daohaus/common-utilities';
import { ITransformedMembership } from '@daohaus/dao-data';
import { HausLayout, useHausConnect } from '@daohaus/daohaus-connect-feature';
import { H1, useDebounce } from '@daohaus/ui';
import { useLayoutEffect, useState } from 'react';

const defaultNetworks = Object.keys(NETWORK_DATA).reduce(
  (acc, networkId) => ({ ...acc, [networkId]: networkId }),
  {}
);
export const DEFAULT_SORT_KEY = 'PROPOSALS';

export function Home() {
  const { isConnected, address } = useHausConnect();

  const [daoData, setDaoData] = useState<ITransformedMembership[]>([]);
  const [filterNetworks, setFilterNetworks] =
    useState<Record<string, string>>(defaultNetworks);
  const [filterDelegate, setFilterDelegate] = useState<string | ''>('');
  const [sortBy, setSortBy] = useState<string>(DEFAULT_SORT_KEY);
  const [searchTerm, setSearchTerm] = useState<string | ''>('');
  const [loading, setLoading] = useState<boolean>(true);

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000);

  return (
    <HausLayout
      navLinks={[
        { label: 'Home', href: '/' },
        { label: 'Profile', href: '/profile' },
      ]}
    >
      <H1>Home</H1>
    </HausLayout>
  );
}

export default Home;
