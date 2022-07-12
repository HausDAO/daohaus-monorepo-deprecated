import { MouseEvent, ChangeEvent } from 'react';
import { Button, useBreakpoint, widthQuery } from '@daohaus/ui';
import styled from 'styled-components';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { indigoDark } from '@radix-ui/colors';

import FilterDropdown from './FilterDropdown';
import SortDropdown from './SortDropdown';
import { ListType } from '../utils/appSpecificTypes';
import SearchInput from './SearchInput';

const IconGrid = styled(BsFillGrid3X3GapFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${indigoDark.indigo10};
  :hover {
    fill: ${indigoDark.indigo10};
  }
`;

const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  padding-top: 3.6rem;
  padding-bottom: 3.6rem;

  .list-type-toggle {
    transform: translateX(-13.5rem);
  }
`;

type TableControlProps = {
  listType: ListType;
  toggleListType: () => void;
  filterNetworks: Record<string, string>;
  toggleNetworkFilter: (event: MouseEvent<HTMLButtonElement>) => void;
  filterDelegate: string;
  toggleDelegateFilter: (event: MouseEvent<HTMLButtonElement>) => void;
  sortBy: string;
  toggleSortBy: (event: MouseEvent<HTMLButtonElement>) => void;
  searchTerm: string;
  setSearchTerm: (event: ChangeEvent<HTMLInputElement>) => void;
};

const TableControl = ({
  listType,
  toggleListType,
  filterNetworks,
  toggleNetworkFilter,
  filterDelegate,
  toggleDelegateFilter,
  sortBy,
  toggleSortBy,
  searchTerm,
  setSearchTerm,
}: TableControlProps) => {
  const isMobile = useBreakpoint(widthQuery.sm);

  return (
    <Layout>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterDropdown
        filterNetworks={filterNetworks}
        toggleNetworkFilter={toggleNetworkFilter}
        filterDelegate={filterDelegate}
        toggleDelegateFilter={toggleDelegateFilter}
      />
      {isMobile || (
        <Button
          secondary
          onClick={toggleListType}
          IconLeft={IconGrid}
          className="list-type-toggle"
        >
          {listType === 'table' ? 'Card View' : 'List View'}
        </Button>
      )}
      <SortDropdown sortBy={sortBy} toggleSortBy={toggleSortBy} />
    </Layout>
  );
};

export default TableControl;
