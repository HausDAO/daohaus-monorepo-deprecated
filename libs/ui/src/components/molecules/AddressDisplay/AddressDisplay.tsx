import {
  ENDPOINTS,
  Keychain,
  truncateAddress,
} from '@daohaus/common-utilities';
import { useTheme } from 'styled-components';

import { RiExternalLinkLine, RiFileCopyLine } from 'react-icons/ri';
import { Theme } from '../../../types/theming';
import {
  AddressContainer,
  AddressCopyIcon,
  AddressDataMd,
} from './AddressDisplay.styles';
import { Icon, Link } from '../../atoms';
import { useToast } from 'libs/ui/src/hooks';

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
  const { successToast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(`${address}`);
    successToast({
      title: `${txHash ? 'Transaction Hash' : 'Address'} copied to clipboard`,
    });
  };

  return (
    <AddressContainer>
      <AddressDataMd {...props}>
        {truncate ? truncateAddress(address) : address}
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
      {explorerNetworkId && (
        <Link
          href={`${ENDPOINTS['EXPLORER'][explorerNetworkId]}/${
            txHash ? 'tx' : 'address'
          }/${address}`}
          linkType="external"
        ></Link>
      )}
    </AddressContainer>
  );
};
