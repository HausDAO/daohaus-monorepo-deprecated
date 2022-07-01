import { Button, Dropdown, DropdownItem, Input, Theme } from '@daohaus/ui';
import styled, { useTheme } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { RiFilterFill } from 'react-icons/ri';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';

import { ParSm } from '@daohaus/ui';
import { indigoDark } from '@radix-ui/colors';
import { ListType } from '../utils/appSpecificTypes';
import { MouseEvent, useState } from 'react';
import { isValidNetwork, networkData } from '@daohaus/common-utilities';

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
};

const TableControl = ({ listType, toggleListType }: TableControlProps) => {
  return (
    <Layout>
      <StyledInput
        icon={IconSearch}
        id="table-search"
        placeholder="Search 3 Daos"
      />
      <FilterDropdown />
      <Button secondary onClick={toggleListType} IconLeft={IconGrid}>
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

const FilterDropdown = () => {
  const [filterNetworks, setFilterNetworks] = useState<Record<string, string>>(
    {}
  );
  const theme = useTheme();

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

  const networkButtons = Object.values(networkData).map(
    (network): DropdownItem => {
      console.log('RENDER');
      const isActive = filterNetworks[network.chainId];
      console.log('filterNetworks', filterNetworks);
      console.log('network.chainId', network.chainId);
      console.log('isActive ', isActive);
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
        //   type: 'clickable',
        //   content: (
        //     <DropdownButton
        //       secondary
        //       fullWidth
        //       leftAlign
        //       value="0x5"
        //       onClick={toggleNetworkFilter}
        //     >
        //       Goerli
        //     </DropdownButton>
        //   ),
        // },
        {
          type: 'label',
          content: <ParSm>Delegation</ParSm>,
        },
        {
          type: 'clickable',
          content: (
            <DropdownButton secondary fullWidth leftAlign>
              I am a Delegate
            </DropdownButton>
          ),
        },
        {
          type: 'clickable',
          content: (
            <DropdownButton secondary fullWidth leftAlign>
              I have a Delegate
            </DropdownButton>
          ),
        },
      ]}
    />
  );
};
