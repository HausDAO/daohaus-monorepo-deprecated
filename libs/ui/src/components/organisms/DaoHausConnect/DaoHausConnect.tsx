import Button, { ButtonProps } from '../../atoms/button/button';
import { RiUserAddLine } from 'react-icons/ri';
import { BiError } from 'react-icons/bi';
import styled from 'styled-components';

const ConnectButton = styled(Button)``;

export const ConnectWalletButton = (props: Omit<ButtonProps, 'children'>) => (
  <Button
    icon={RiUserAddLine}
    className="menu-button"
    onClick={() => {
      console.log('functionality goes here');
    }}
    {...props}
  >
    Connect Wallet
  </Button>
);
export const WarningButton = ({ children, ...props }: ButtonProps) => (
  <Button tertiary icon={BiError} {...props}>
    {children}
  </Button>
);

export const ExitButton = (props: ButtonProps) => (
  <Button tertiary fullWidth sm {...props} />
);

export const WrongNetworkButton = ({
  ...props
}: Omit<ButtonProps, 'children'>) => {
  const networkName = 'Gnosis'; /*derive dao network name from url or context*/
  return (
    <WarningButton
      onClick={() => {
        console.log('functionality goes here');
      }}
      {...props}
    >
      Switch to {networkName}
    </WarningButton>
  );
};
