import { Button, Dropdown, DropdownItem, Input, Theme } from '@daohaus/ui';
import styled, { useTheme } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { RiFilterFill } from 'react-icons/ri';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';

import { ParSm } from '@daohaus/ui';
import { indigoDark } from '@radix-ui/colors';
import { ListType } from '../utils/appSpecificTypes';
import { MouseEvent } from 'react';
import { networkData } from '@daohaus/common-utilities';

const IconFilter = styled(RiFilterFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${indigoDark.indigo10};
  :hover {
    fill: ${indigoDark.indigo10};
  }
`;

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
      <Button
        secondary
        onClick={toggleListType}
        IconLeft={IconGrid}
        className="list-type-toggle"
      >
        {listType === 'table' ? 'Card View' : 'List View'}
      </Button>
    </Layout>
  );
};

export default TableControl;

const DropdownButton = styled(Button)`
  &.selected {
    background-color: ${(props: { theme: Theme }) => props.theme.secondary};
  }
`;

type FilterDropdownProps = {
  filterNetworks: Record<string, string>;
  toggleNetworkFilter: (event: MouseEvent<HTMLButtonElement>) => void;
  filterDelegate: string;
  toggleDelegateFilter: (event: MouseEvent<HTMLButtonElement>) => void;
};

const FilterDropdown = ({
  filterNetworks,
  toggleNetworkFilter,
  filterDelegate,
  toggleDelegateFilter,
}: FilterDropdownProps) => {
  const theme = useTheme();
  console.log('filterDelegate', filterDelegate);
  const networkButtons = Object.values(networkData).map(
    (network): DropdownItem => {
      const isActive = filterNetworks[network.chainId];
      return {
        type: 'clickable',
        content: (
          <DropdownButton
            key={network.chainId}
            value={network.chainId}
            onClick={toggleNetworkFilter}
            className={isActive ? 'selected' : ''}
            secondary
            fullWidth
            leftAlign
            IconRight={isActive ? AiOutlineCheck : undefined}
          >
            <div style={{ width: '100%' }}>{network.name}</div>
          </DropdownButton>
        ),
      };
    }
  );

  return (
    <Dropdown
      align="end"
      width="25rem"
      spacing=".6rem"
      bg={theme.button.secondary.bg}
      trigger={
        <Button secondary IconLeft={IconFilter}>
          Filters
        </Button>
      }
      items={[
        { type: 'label', content: <ParSm>Networks</ParSm> },
        ...networkButtons,
        {
          type: 'label',
          content: <ParSm>Delegation</ParSm>,
        },
        {
          type: 'clickable',
          content: (
            <DropdownButton
              secondary
              fullWidth
              leftAlign
              value="iAmDelegate"
              onClick={toggleDelegateFilter}
              IconRight={
                filterDelegate === 'iAmDelegate' ? AiOutlineCheck : undefined
              }
              className={filterDelegate === 'iAmDelegate' ? 'selected' : ''}
            >
              <div style={{ width: '100%' }}>I am a Delegate</div>
            </DropdownButton>
          ),
        },
        {
          type: 'clickable',
          content: (
            <DropdownButton
              secondary
              fullWidth
              leftAlign
              value="iAmDelegating"
              onClick={toggleDelegateFilter}
              IconRight={
                filterDelegate === 'iAmDelegating' ? AiOutlineCheck : undefined
              }
              className={filterDelegate === 'iAmDelegating' ? 'selected' : ''}
            >
              <div style={{ width: '100%' }}>I have a Delegate</div>
            </DropdownButton>
          ),
        },
      ]}
    />
  );
};
