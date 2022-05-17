import { Keychain, networkData, NetworkType } from '@daohaus/common-utilities';
import { Button, Dropdown, DropdownItem, ParXs } from '@daohaus/ui';
import { BiError } from 'react-icons/bi';
import { useHausConnect } from '../../HausConnectContext';

//  Refactor

export const NetworkButton = () => {
  const { isDaoScope, validNetwork, isConnected } = useHausConnect();

  if (isDaoScope || !isConnected) {
    // return
    return null;
  }

  if (!validNetwork) {
    return <NotSupportedNetwork />;
  }

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

export const NotSupportedNetwork = () => {
  const { switchNetwork } = useHausConnect();

  return (
    <Dropdown
      align="end"
      spacing="0.7rem"
      width="26rem"
      trigger={
        <Button tertiary IconLeft={BiError}>
          Network Unavailable
        </Button>
      }
      items={[
        { type: 'label', content: <ParXs>Switch to available network</ParXs> },
        ...getNetworkPanels(networkData, switchNetwork),
      ]}
    />
  );
};
