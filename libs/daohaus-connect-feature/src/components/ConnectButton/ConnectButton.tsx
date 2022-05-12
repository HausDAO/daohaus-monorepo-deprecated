import { getNetworkName } from '@daohaus/common-utilities';
import { Bold, Button, Dropdown, ParMd, ParXs } from '@daohaus/ui';

import { violet } from '@radix-ui/colors';
import { RiUserAddLine } from 'react-icons/ri';
import styled from 'styled-components';
import { useHausConnect } from '../../HausConnectContext';
import { truncateAddress } from '../../utils/common';

export const ConnectButton = () => {
  const { isConnected } = useHausConnect() || {};
  return isConnected ? <UserConnectedDropdown /> : <ConnectWalletButton />;
};

const ConnectWalletButton = () => {
  const { connectWallet } = useHausConnect() || {};
  return (
    <Button
      icon={RiUserAddLine}
      className="menu-button"
      onClick={connectWallet}
    >
      Connect Wallet
    </Button>
  );
};

const UserConnectedDropdown = () => {
  const { disconnect, address, chainId } = useHausConnect();
  return (
    <Dropdown
      spacing="0.7rem"
      align="end"
      trigger={
        <Button avatar fullWidth>
          <Container>
            <TemporaryAvatar />
            <div className="interior">
              {/* TODO add redults from getProfile*/}
              <ParMd>Jord</ParMd>
              <ParXs>@{chainId && getNetworkName(chainId)}</ParXs>
            </div>
          </Container>
        </Button>
      }
      items={[
        {
          type: 'label',
          content: (
            <div
              style={{
                padding: '.8rem',
              }}
            >
              <ParXs style={{ marginBottom: '.5rem' }}>
                {address && truncateAddress(address)}
              </ParXs>
              <ParXs>
                Connected to <Bold>{chainId && getNetworkName(chainId)}</Bold>
              </ParXs>
            </div>
          ),
        },
        {
          type: 'clickable',
          content: (
            <Button tertiary fullWidth sm onClick={disconnect}>
              Disconnect
            </Button>
          ),
        },
      ]}
    />
  );
};

const TemporaryAvatar = styled.div`
  width: 3rem;
  height: 3rem;

  background-color: ${violet.violet9};
  border-radius: 45px;
  margin-right: 0.75rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  p {
    text-align: left;
  }
  .interior {
    display: flex;
    flex-direction: column;
  }
`;
