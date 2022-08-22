import {
  generateExplorerLink,
  Keychain,
  truncateAddress,
} from '@daohaus/common-utilities';
import { useTheme } from 'styled-components';
import { RiFileCopyLine } from 'react-icons/ri';

import { Theme } from '../../../types/theming';
import {
  AddressContainer,
  AddressCopyIcon,
  AddressDataMd,
} from './AddressDisplay.styles';
import { Icon, Link } from '../../atoms';
import { useCopyToClipboard } from '../../../hooks';
import { useMemo } from 'react';

type AddressDisplayProps = {
  address: string;
  explorerNetworkId?: keyof Keychain;
  copy?: boolean;
  truncate?: boolean;
  txHash?: boolean;
  textOverride?: string;
};

export const AddressDisplay = ({
  address,
  explorerNetworkId,
  copy,
  truncate,
  txHash,
  textOverride,
  ...props
}: AddressDisplayProps) => {
  const theme = useTheme() as Theme;
  const [value, copyToClipboard] = useCopyToClipboard();

  const explorerLink = useMemo(() => {
    if (explorerNetworkId) {
      return generateExplorerLink({
        chainId: explorerNetworkId,
        address,
        type: txHash ? 'tx' : 'address',
      });
    }
  }, [address, txHash, explorerNetworkId]);

  const handleCopy = () => {
    const shortAddress = truncateAddress(address);
    copyToClipboard(
      shortAddress,
      `Success ${txHash ? 'Transaction Hash:' : 'Address:'}`
    );
  };

  const displayAddress = truncate ? truncateAddress(address) : address;

  return (
    <AddressContainer>
      <AddressDataMd {...props}>
        {textOverride ? textOverride : displayAddress}
      </AddressDataMd>
      {copy && (
        <AddressCopyIcon>
          <Icon>
            <RiFileCopyLine
              size="1.5rem"
              color={theme.link.color}
              onClick={handleCopy}
            />
          </Icon>
        </AddressCopyIcon>
      )}
      {explorerLink && <Link href={explorerLink} linkType="external"></Link>}
    </AddressContainer>
  );
};
