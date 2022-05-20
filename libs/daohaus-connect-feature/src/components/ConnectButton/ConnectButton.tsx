import { Button, Spinner } from '@daohaus/ui';

import { RiUserAddLine } from 'react-icons/ri';
import { useHausConnect } from '../../HausConnectContext';
import { ButtonContainer } from './ConnectButtonStyles';
import { UserConnectedDropdown } from './UserConnetedDropdown';

export const ConnectButton = () => {
  const { isConnected, isProfileLoading } = useHausConnect();
  if (!isConnected) {
    return <ConnectWalletButton />;
  }
  if (isProfileLoading) {
    return <LoadingButton />;
  }
  return <UserConnectedDropdown />;
};

const ConnectWalletButton = () => {
  const { connectWallet } = useHausConnect();
  return (
    <ButtonContainer>
      <Button fullWidth IconLeft={RiUserAddLine} onClick={connectWallet}>
        Connect Wallet
      </Button>
    </ButtonContainer>
  );
};

const LoadingButton = () => {
  return (
    <ButtonContainer>
      <Button fullWidth>
        <Spinner />
      </Button>
    </ButtonContainer>
  );
};
