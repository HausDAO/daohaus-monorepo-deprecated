import { Keychain, truncateAddress } from '@daohaus/common-utilities';
import { useTheme } from 'styled-components';

import { RiExternalLinkLine, RiFileCopyLine } from 'react-icons/ri';
import { Theme } from '../../../types/theming';
import { AddressContainer, AddressDataMd } from './AddressDisplay.styles';
import { Icon } from '../../atoms';

type AddressDisplayProps = {
  address: string;
  explorerNetworkId?: keyof Keychain;
  copy?: boolean;
  truncate?: boolean;
  txHash?: boolean;
};

export const AddressDisplay = ({
  address,
  explorerNetworkId,
  copy,
  truncate,
  txHash,
  ...props
}: AddressDisplayProps) => {
  const theme = useTheme() as Theme;

  return (
    <AddressContainer>
      <AddressDataMd color="" {...props}>
        {truncate ? truncateAddress(address) : address}
      </AddressDataMd>
      {copy && (
        <Icon>
          <RiFileCopyLine size="1.5rem" color={theme.primary} />
        </Icon>
      )}
      {explorerNetworkId && (
        <Icon>
          <RiExternalLinkLine size="1.5rem" color={theme.primary} />
        </Icon>
      )}
    </AddressContainer>
  );
};
