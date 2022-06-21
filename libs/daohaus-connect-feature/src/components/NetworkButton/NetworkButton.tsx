import { BiError } from 'react-icons/bi';
import styled from 'styled-components';

import {
  getNetworkName,
  Keychain,
  NetworkType,
} from '@daohaus/common-utilities';
import { Button, Dropdown, DropdownItem, ParXs, widthQuery } from '@daohaus/ui';

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
): DropdownItem[] =>
  Object.values(availableNetworks).map((network) => {
    const handleNetworkSwitch = () => {
      switchNetwork(network.chainId);
    };
    return {
      key: network.chainId,
      type: 'clickable',
      content: (
        <WarningButton
          secondary
          fullWidth
          leftAlign
          onClick={handleNetworkSwitch}
        >
          {network.name}
        </WarningButton>
      ),
    };
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
    <ConnectDropdown
      align="end"
      spacing="0.7rem"
      width="25.25rem"
      trigger={innerButton}
      items={[
        { type: 'label', content: <ParXs>Switch to available network</ParXs> },
        ...getNetworkPanels(networks, switchNetwork),
      ]}
    />
  );
};

const ConnectDropdown = styled(Dropdown)`
  display: flex;
  justify-content: flex-end;
`;

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
