import { Button, Input, useBreakpoint, widthQuery } from '@daohaus/ui';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';

import { indigoDark } from '@radix-ui/colors';
import { ListType } from '../utils/appSpecificTypes';
import { MouseEvent } from 'react';
import FilterDropdown from './FilterDropdown';

const IconGrid = styled(BsFillGrid3X3GapFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${indigoDark.indigo10};
  :hover {
    fill: ${indigoDark.indigo10};
  }
`;

const IconSearch = styled(BiSearch)`
  fill: ${indigoDark.indigo11};
  :hover {
    fill: ${indigoDark.indigo11};
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

const StyledInput = styled(Input)`
  background: ${indigoDark.indigo3};
  color: ${indigoDark.indigo11};
  ::placeholder {
    color: ${indigoDark.indigo11};
  }
  :focus {
    background: ${indigoDark.indigo3};
    color: ${indigoDark.indigo11};
  }
`;

type TableControlProps = {
  listType: ListType;
  toggleListType: () => void;
  filterNetworks: Record<string, string>;
  toggleNetworkFilter: (event: MouseEvent<HTMLButtonElement>) => void;
  filterDelegate: string;
  toggleDelegateFilter: (event: MouseEvent<HTMLButtonElement>) => void;
};

const TableControl = ({
  listType,
  toggleListType,
  filterNetworks,
  toggleNetworkFilter,
  filterDelegate,
  toggleDelegateFilter,
}: TableControlProps) => {
  const isMobile = !useBreakpoint(widthQuery.sm);
  return (
    <Layout>
      <StyledInput
        icon={IconSearch}
        id="table-search"
        placeholder="Search 3 Daos"
      />
      <FilterDropdown
        filterNetworks={filterNetworks}
        toggleNetworkFilter={toggleNetworkFilter}
        filterDelegate={filterDelegate}
        toggleDelegateFilter={toggleDelegateFilter}
      />
      {!isMobile || (
        <Button
          secondary
          onClick={toggleListType}
          IconLeft={IconGrid}
          className="list-type-toggle"
        >
          {listType === 'table' ? 'Card View' : 'List View'}
        </Button>
      )}
    </Layout>
  );
};

export default TableControl;
