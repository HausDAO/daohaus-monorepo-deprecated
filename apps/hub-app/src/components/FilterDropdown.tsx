import { MouseEvent } from 'react';
import styled, { useTheme } from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiFilterFill } from 'react-icons/ri';

import { Button, Dropdown, DropdownItem, Theme } from '@daohaus/ui';
import { ParSm } from '@daohaus/ui';
import { networkData } from '@daohaus/common-utilities';

const DropdownButton = styled(Button)`
  &.selected {
    background-color: ${(props: { theme: Theme }) => props.theme.secondary};
  }
`;

const IconFilter = styled(RiFilterFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
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

export default FilterDropdown;
