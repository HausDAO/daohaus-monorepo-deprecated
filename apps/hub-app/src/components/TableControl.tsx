import { MouseEvent, ChangeEvent } from 'react';
import { breakpoints, Button, useBreakpoint, widthQuery } from '@daohaus/ui';
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
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 2.4rem;
  padding-top: 3.6rem;
  padding-bottom: 3.6rem;

  .list-toggle {
    margin-left: 2rem;
  }

  .button-box {
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: ${breakpoints.sm}) {
    align-items: center;
    flex-direction: row;
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
  switchSortBy: (event: ChangeEvent<HTMLSelectElement>) => void;
  searchTerm: string;
  setSearchTerm: (event: ChangeEvent<HTMLInputElement>) => void;
  totalDaos: number;
};

const TableControl = ({
  listType,
  toggleListType,
  filterNetworks,
  toggleNetworkFilter,
  filterDelegate,
  toggleDelegateFilter,
  sortBy,
  switchSortBy,
  searchTerm,
  setSearchTerm,
  totalDaos,
}: TableControlProps) => {
  const isMobile = useBreakpoint(widthQuery.sm);

  return (
    <Layout>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalDaos={totalDaos}
      />
      <div className="button-box">
        <FilterDropdown
          filterNetworks={filterNetworks}
          toggleNetworkFilter={toggleNetworkFilter}
          filterDelegate={filterDelegate}
          toggleDelegateFilter={toggleDelegateFilter}
        />
        {isMobile || (
          <Button
            colorVariant="secondary"
            onClick={toggleListType}
            IconLeft={IconGrid}
            className="list-toggle"
          >
            {listType === 'table' ? 'Card View' : 'List View'}
          </Button>
        )}
      </div>

      <SortDropdown sortBy={sortBy} switchSortBy={switchSortBy} />
    </Layout>
  );
};

export default TableControl;
