import { NETWORK_DATA } from '@daohaus/common-utilities';
import {
  Button,
  Dropdown,
  DropdownButton,
  DropdownMenuItem,
  DropdownMenuLabel,
  ParSm,
} from '@daohaus/ui';
import { indigoDark } from '@radix-ui/colors';
import { MouseEvent } from 'react';
import { RiCheckLine, RiFilterFill } from 'react-icons/ri';
import styled, { useTheme } from 'styled-components';
import { FILTER_TYPE } from '../utils/hub';

// HOW CAN THIS BE GENERALIZED?

type DAOFilterDropdownProps = {
  filterNetworks: Record<string, string>;
  toggleNetworkFilter: (event: MouseEvent<HTMLButtonElement>) => void;
  filterDelegate: string;
  toggleDelegateFilter: (event: MouseEvent<HTMLButtonElement>) => void;
};

const IconFilter = styled(RiFilterFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  // USE THEME
  fill: ${indigoDark.indigo10};
  :hover {
    fill: ${indigoDark.indigo10};
  }
`;

export const DAOFilterDropdown = ({
  filterNetworks,
  toggleNetworkFilter,
  filterDelegate,
  toggleDelegateFilter,
}: DAOFilterDropdownProps) => {
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
          IconRight={isActive ? RiCheckLine : undefined}
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
            filterDelegate === FILTER_TYPE.DELEGATING ? RiCheckLine : undefined
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
              ? RiCheckLine
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
