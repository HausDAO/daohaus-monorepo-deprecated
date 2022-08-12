import { BiError } from 'react-icons/bi';
import styled from 'styled-components';

import {
  getNetworkName,
  Keychain,
  NetworkType,
} from '@daohaus/common-utilities';
import {
  Button,
  Dropdown,
  DropdownMenuItem,
  DropdownMenuLabel,
  ParXs,
  widthQuery,
} from '@daohaus/ui';

import { useHausConnect } from '../../HausConnectContext';

export const NetworkButton = ({ isSm }: { isSm: boolean }) => {
  const { isDaoScope, validNetwork, isConnected } = useHausConnect();

  if (!isConnected) return null;

  if (
    isDaoScope /*AND user's network is different from DAO's network (in DAO context)*/
  )
    return <NotDaoNetwork isSm={isSm} />;

  if (!validNetwork) return <NotSupportedNetwork isSm={isSm} />;

  return null;
};

export const getNetworkPanels = (
  availableNetworks: Keychain<NetworkType>,
  switchNetwork: (id: string) => void
) =>
  Object.values(availableNetworks).map((network) => {
    const handleNetworkSwitch = () => {
      switchNetwork(network.chainId);
    };
    return (
      <DropdownMenuItem asChild>
        <WarningButton
          secondary
          fullWidth
          leftAlign
          onClick={handleNetworkSwitch}
        >
          {network.name}
        </WarningButton>
      </DropdownMenuItem>
    );
  });

export const NotDaoNetwork = ({ isSm }: { isSm: boolean }) => {
  //  In the future, this will come from the dao context
  const { switchNetwork } = useHausConnect();
  const sampleDaoNetworkId = '0x1';

  const handleSwitchNetwork = () => {
    switchNetwork(sampleDaoNetworkId);
  };

  return (
    <WarningButton
      tertiary
      IconLeft={BiError}
      onClick={handleSwitchNetwork}
      sm={isSm}
    >
      {isSm ? '' : `Switch to ${getNetworkName(sampleDaoNetworkId)}`}
    </WarningButton>
  );
};

export const NotSupportedNetwork = ({ isSm }: { isSm: boolean }) => {
  const { switchNetwork, networks } = useHausConnect();

  const innerButton = isSm ? (
    <WarningButton tertiary sm IconLeft={BiError} />
  ) : (
    <WarningButton tertiary IconLeft={BiError}>
      Network Unavailable
    </WarningButton>
  );

  return (
    <Dropdown
      align="end"
      spacing="0.7rem"
      menuMinWidth="25.25rem"
      trigger={innerButton}
    >
      <DropdownMenuLabel>
        <ParXs>Switch to available network</ParXs>
      </DropdownMenuLabel>
      {getNetworkPanels(networks, switchNetwork)}
    </Dropdown>
  );
};

const WarningButton = styled(Button)`
  @media ${widthQuery.sm} {
    &.sm {
      min-width: 0;
      display: flex;
    }
    svg.icon-left {
      margin-right: 0;
    }
  }
`;
