import { useState } from 'react';
import classNames from 'classnames';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import styled, { useTheme } from 'styled-components';

import { getNetworkName, truncateAddress } from '@daohaus/common-utilities';
import {
  Button,
  Dropdown,
  DropdownMenuItem,
  DropdownMenuLabel,
  ParMd,
  ParXs,
  ProfileAvatar,
} from '@daohaus/ui';

import { useHausConnect } from '../../HausConnectContext';
import { ExplorerLink } from '../ExplorerLink';

export const UserConnectedDropdown = ({ isSm }: { isSm: boolean }) => {
  const { disconnect, address, chainId, profile, validNetwork } =
    useHausConnect();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const classes = classNames({ 'mobile-connect-btn': isSm });
  return (
    <Dropdown
      spacing="0.7rem"
      menuMinWidth={isSm ? 'fit-content' : '25rem'}
      align="end"
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          avatar
          sm={isSm}
          IconRight={open ? BiChevronUp : BiChevronDown}
          className={classes}
          width={!isSm ? '25rem' : ''}
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
    >
      <DropdownMenuLabel>
        <div
          style={{
            padding: '.8rem',
          }}
        >
          <AddressContainer className="address-container">
            <ExplorerLink
              className="explorer-link"
              address={address || undefined}
            >
              <ParXs>{address && truncateAddress(address)}</ParXs>
            </ExplorerLink>
          </AddressContainer>
          <ParXs>
            {validNetwork && chainId
              ? `Connected To ${getNetworkName(chainId)}`
              : 'Unsupported Network'}
          </ParXs>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuItem>
        <Button tertiary fullWidth sm onClick={disconnect}>
          Disconnect
        </Button>
      </DropdownMenuItem>
    </Dropdown>
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

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;
