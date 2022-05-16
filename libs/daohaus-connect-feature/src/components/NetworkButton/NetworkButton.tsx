import { Keychain, networkData, NetworkType } from '@daohaus/common-utilities';
import { Button, Dropdown, DropdownItem, ParXs } from '@daohaus/ui';
import { BiError } from 'react-icons/bi';

//  Refactor

export const NetworkButton = () => <BadNetworkDropdown />;

export const getNetworkPanels = (
  availableNetworks: Keychain<NetworkType>
): DropdownItem[] =>
  Object.values(availableNetworks).map((network) => {
    return {
      type: 'clickable',
      content: (
        <Button secondary fullWidth leftAlign>
          {network.name}
        </Button>
      ),
    };
  });
export const BadNetworkDropdown = () => {
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
        ...getNetworkPanels(networkData),
      ]}
    />
  );
};
