import { useState } from 'react';
import classNames from 'classnames';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import styled, { useTheme } from 'styled-components';

import { getNetworkName, truncateAddress } from '@daohaus/common-utilities';
import { Button, Dropdown, ParMd, ParXs, ProfileAvatar } from '@daohaus/ui';

import { useHausConnect } from '../../HausConnectContext';
import { ExplorerLink } from '../ExplorerLink';

export const UserConnectedDropdown = ({ isSm }: { isSm: boolean }) => {
  const { disconnect, address, chainId, profile, validNetwork } =
    useHausConnect();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const classes = classNames({ 'mobile-connect-btn': isSm });
  return (
    <ConnectDropdown
      spacing="0.7rem"
      width={isSm ? 'fit-content' : '25rem'}
      align="end"
      open={open}
      onOpenChange={setOpen}
      className={'user-connect-dropdown'}
      trigger={
        <Button
          avatar
          fullWidth={!isSm}
          sm={isSm}
          IconRight={open ? BiChevronUp : BiChevronDown}
          className={classes}
        >
          <Container>
            <ProfileAvatar
              image={profile?.image}
              address={profile?.address}
              size="sm"
              className="user-avatar"
            />
            <div className="interior">
              {!isSm && (
                <ParMd color={theme.button.primary.text}>
                  {profile?.displayName ||
                    (address && truncateAddress(address.toLowerCase()))}
                </ParMd>
              )}
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
              <AddressContainer className="address-container">
                <ParXs style={{ marginBottom: '.5rem' }}>
                  {address && truncateAddress(address)}
                </ParXs>
                <ExplorerLink
                  className="explorer-link"
                  address="0x756ee8B8E898D497043c2320d9909f1DD5a7077F"
                />
              </AddressContainer>
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

const ConnectDropdown = styled(Dropdown)`
  display: flex;
  justify-content: flex-end;
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
  .user-avatar {
    margin-right: 0.75rem;
  }
`;

const AddressContainer = styled.div`
  display: flex;
  .explorer-link {
    transform: translateY(0.2rem);
  }
`;
