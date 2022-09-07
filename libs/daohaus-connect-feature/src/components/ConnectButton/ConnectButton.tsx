import { amberDark } from '@radix-ui/colors';
import { Button, Spinner } from '@daohaus/ui';
import { RiUserAddLine } from 'react-icons/ri';
import classNames from 'classnames';

import { useHausConnect } from '../../HausConnectContext';
import { ButtonContainer } from './ConnectButtonStyles';
import { UserConnectedDropdown } from './UserConnetedDropdown';

export const ConnectButton = ({ isSm }: { isSm: boolean }) => {
  const { isConnected, isProfileLoading } = useHausConnect();

  if (!isConnected) {
    return <ConnectWalletButton isSm={isSm} />;
  }
  if (isProfileLoading) {
    return <LoadingButton isSm={isSm} />;
  }
  return <UserConnectedDropdown isSm={isSm} />;
};

const ConnectWalletButton = ({ isSm }: { isSm: boolean }) => {
  const { connectWallet } = useHausConnect();

  const classes = classNames({ 'mobile-connect-btn': isSm });
  return (
    <ButtonContainer>
      <Button
        fullWidth={!isSm}
        IconLeft={RiUserAddLine}
        onClick={connectWallet}
        sm={isSm}
        className={classes}
      >
        Connect Wallet
      </Button>
    </ButtonContainer>
  );
};

const LoadingButton = ({ isSm }: { isSm: boolean }) => {
  return (
    <ButtonContainer>
      <Button fullWidth={!isSm} sm={isSm}>
        <Spinner
          topColor={amberDark.amber8}
          bottomColor={amberDark.amber11}
          size={isSm ? '2rem' : '2.8rem'}
          strokeWidth=".3rem"
        />
      </Button>
    </ButtonContainer>
  );
};
