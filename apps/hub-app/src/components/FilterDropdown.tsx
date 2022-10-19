import { MouseEvent } from 'react';
import styled, { useTheme } from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiFilterFill } from 'react-icons/ri';

import {
  Button,
  Dropdown,
  DropdownMenuItem,
  DropdownMenuLabel,
  Theme,
} from '@daohaus/ui';
import { ParSm } from '@daohaus/ui';
import { NETWORK_DATA } from '@daohaus/common-utilities';
import { indigoDark } from '@radix-ui/colors';
import { FILTER_TYPE } from '../utils/constants';

const DropdownButton = styled(Button)`
  &.selected {
    background-color: ${(props: { theme: Theme }) =>
      props.theme.secondary.step9};
  }
`;

const IconFilter = styled(RiFilterFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${indigoDark.indigo10};
  :hover {
    fill: ${indigoDark.indigo10};
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

  const networkButtons = Object.values(NETWORK_DATA).map((network) => {
    const isActive = filterNetworks[network.chainId];
    return (
      <DropdownMenuItem key={network.chainId} asChild>
        <DropdownButton
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
      </DropdownMenuItem>
    );
  });
  return (
    <Dropdown
      align="end"
      menuBg={theme.button.secondary.bg}
      menuMinWidth="25rem"
      spacing=".6rem"
      trigger={
        <Button secondary IconLeft={IconFilter}>
          Filters
        </Button>
      }
    >
      <DropdownMenuLabel>
        <ParSm>Networks</ParSm>
      </DropdownMenuLabel>
      {networkButtons}
      <DropdownMenuLabel>
        <ParSm>Delegation</ParSm>
      </DropdownMenuLabel>
      <DropdownMenuItem asChild>
        <DropdownButton
          secondary
          fullWidth
          leftAlign
          value={FILTER_TYPE.DELEGATING}
          onClick={toggleDelegateFilter}
          IconRight={
            filterDelegate === FILTER_TYPE.DELEGATING
              ? AiOutlineCheck
              : undefined
          }
          className={
            filterDelegate === FILTER_TYPE.DELEGATING ? 'selected' : ''
          }
        >
          <div style={{ width: '100%' }}>I am a Delegate</div>
        </DropdownButton>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <DropdownButton
          secondary
          fullWidth
          leftAlign
          value={FILTER_TYPE.DELEGATING_TO}
          onClick={toggleDelegateFilter}
          IconRight={
            filterDelegate === FILTER_TYPE.DELEGATING_TO
              ? AiOutlineCheck
              : undefined
          }
          className={
            filterDelegate === FILTER_TYPE.DELEGATING_TO ? 'selected' : ''
          }
        >
          <div style={{ width: '100%' }}>I have a Delegate</div>
        </DropdownButton>
      </DropdownMenuItem>
    </Dropdown>
  );
};

export default FilterDropdown;
