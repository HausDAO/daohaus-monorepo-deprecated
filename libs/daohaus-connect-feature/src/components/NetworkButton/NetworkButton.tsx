import { BiError } from 'react-icons/bi';

import {
  getNetworkName,
  Keychain,
  NetworkType,
} from '@daohaus/common-utilities';
import { Button, Dropdown, DropdownItem, ParXs } from '@daohaus/ui';

import { useHausConnect } from '../../HausConnectContext';

export const NetworkButton = () => {
  const { isDaoScope, validNetwork, isConnected } = useHausConnect();
  if (!isConnected) return null;

  if (
    isDaoScope /*AND user's network is different from DAO's network (in DAO context)*/
  )
    return <NotDaoNetwork />;

  if (!validNetwork) return <NotSupportedNetwork />;

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
        <Button secondary fullWidth leftAlign onClick={handleNetworkSwitch}>
          {network.name}
        </Button>
      ),
    };
  });

export const NotDaoNetwork = () => {
  //  In the future, this will come from the dao context
  const { switchNetwork } = useHausConnect();
  const sampleDaoNetworkId = '0x1';

  const handleSwitchNetwork = () => {
    switchNetwork(sampleDaoNetworkId);
  };
  return (
    <Button tertiary IconLeft={BiError} onClick={handleSwitchNetwork}>
      Switch to {getNetworkName(sampleDaoNetworkId)}
    </Button>
  );
};

export const NotSupportedNetwork = () => {
  const { switchNetwork, networks } = useHausConnect();

  return (
    <Dropdown
      align="end"
      spacing="0.7rem"
      width="25.25rem"
      trigger={
        <Button tertiary IconLeft={BiError}>
          Network Unavailable
        </Button>
      }
      items={[
        { type: 'label', content: <ParXs>Switch to available network</ParXs> },
        ...getNetworkPanels(networks, switchNetwork),
      ]}
    />
  );
};
