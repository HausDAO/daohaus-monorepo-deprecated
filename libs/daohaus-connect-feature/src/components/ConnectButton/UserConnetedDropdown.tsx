import { getNetworkName } from '@daohaus/common-utilities';
import { Button, Dropdown, ParMd, ParXs, ProfileAvatar } from '@daohaus/ui';

import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import styled, { useTheme } from 'styled-components';
import { useHausConnect } from '../../HausConnectContext';
import { truncateAddress } from '../../utils/common';

export const UserConnectedDropdown = () => {
  const { disconnect, address, chainId, profile, validNetwork } =
    useHausConnect();
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      spacing="0.7rem"
      width="25rem"
      align="end"
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button avatar fullWidth IconRight={open ? BiChevronUp : BiChevronDown}>
          <Container>
            <ProfileAvatar
              image={profile?.image}
              address={profile?.address}
              size="sm"
              className="user-avatar"
            />
            <div className="interior">
              <ParMd color={theme.button.primary.text}>
                {profile?.displayName ||
                  (address && truncateAddress(address.toLowerCase()))}
              </ParMd>
              <ParXs color={theme.button.primary.text}>
                {chainId && validNetwork
                  ? `@${getNetworkName(chainId)}`
                  : 'Wrong Network'}
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
                {validNetwork && chainId
                  ? `Connected To ${getNetworkName(chainId)}`
                  : 'Unsupported Network'}
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
  .user-avatar {
    margin-right: 0.75rem;
  }
`;
