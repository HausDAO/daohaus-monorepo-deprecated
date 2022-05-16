import { getNetworkName } from '@daohaus/common-utilities';
import { Bold, Button, Dropdown, ParMd, ParXs } from '@daohaus/ui';

import { violet } from '@radix-ui/colors';
import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { RiUserAddLine } from 'react-icons/ri';
import styled, { useTheme } from 'styled-components';
import { useHausConnect } from '../../HausConnectContext';
import { truncateAddress } from '../../utils/common';

export const ConnectButton = () => {
  const { isConnected, isProfileLoading } = useHausConnect() || {};
  if (!isConnected) {
    return <ConnectWalletButton />;
  }
  if (isProfileLoading) {
    return <LoadingButton />;
  }
  return <UserConnectedDropdown />;
};

const ConnectWalletButton = () => {
  const { connectWallet } = useHausConnect() || {};
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
      <Button fullWidth>Loading</Button>
    </ButtonContainer>
  );
};

const UserConnectedDropdown = () => {
  const { disconnect, address, chainId, profile } = useHausConnect();
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      spacing="0.7rem"
      align="end"
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button avatar fullWidth IconRight={open ? BiChevronUp : BiChevronDown}>
          <Container>
            <TemporaryAvatar />
            <div className="interior">
              <ParMd color={theme.button.primary.text}>
                {profile?.displayName}
              </ParMd>
              <ParXs color={theme.button.primary.text}>
                @{chainId && getNetworkName(chainId)}
              </ParXs>
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
  width: 100%;
  p {
    text-align: left;
  }
  .interior {
    display: flex;
    flex-direction: column;
  }
`;
const ButtonContainer = styled.div`
  width: 20rem;
`;
