import {
  Dropdown,
  DropdownMenuItem,
  DropdownButton,
  font,
  Theme,
  Dialog,
  DialogTrigger,
  DialogContent,
} from '@daohaus/ui';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import styled from 'styled-components';
import ManageDelegate from './ManageDelegate';

export const ProfileMenuTrigger = styled(DropdownButton)`
  padding: 0 4px 0 4px;

  &[data-state='open'] {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  svg.icon-right {
    color: ${({ theme }: { theme: Theme }) => theme.primary};
  }

  svg.icon-left {
    margin-right: 0;
  }
`;

export const ProfileMenuLink = styled.p`
  border-radius: 2px;
  color: ${(props) => props.theme.dropdown.text};
  font-weight: ${font.weight.bold};
  cursor: pointer;
  display: flex;
  padding: 1rem;
  transition: 0.2s all;
  width: 100%;
  font-size: ${font.size.md};

  svg {
    margin-left: 0.3rem;
  }

  :hover {
    background-color: ${(props) => props.theme.navTabs.hoverNavLinkDropdownBg};
    border-color: ${(props) => props.theme.navTabs.hoverNavLinkDropdownBorder};
    text-decoration: none;
  }

  &.disabled {
    color: ${(props) => props.theme.dropdown.textDisabled};
  }
`;

type MemberProfileMenuProps = {
  isConnectedMember: boolean;
};

export const MemberProfileMenu = ({
  isConnectedMember,
}: MemberProfileMenuProps) => {
  return (
    <Dropdown
      menuMinWidth="17.8rem"
      trigger={<ProfileMenuTrigger IconLeft={BiDotsVerticalRounded} sm />}
      side="left"
    >
      {isConnectedMember && (
        <>
          <DropdownMenuItem key="delegate" asChild>
            <Dialog>
              <DialogTrigger asChild>
                <ProfileMenuLink>Delegate</ProfileMenuLink>
              </DialogTrigger>
              <DialogContent title="Manage Delegate">
                <ManageDelegate />
              </DialogContent>
            </Dialog>
          </DropdownMenuItem>
          <DropdownMenuItem key="ragequit" asChild>
            <ProfileMenuLink>Rage Quit</ProfileMenuLink>
          </DropdownMenuItem>
        </>
      )}

      {!isConnectedMember && (
        <>
          <DropdownMenuItem key="delegateTo" asChild>
            <ProfileMenuLink>Delegate To</ProfileMenuLink>
          </DropdownMenuItem>
          <DropdownMenuItem key="ragequit" asChild>
            <ProfileMenuLink>Rage Kick</ProfileMenuLink>
          </DropdownMenuItem>
        </>
      )}
    </Dropdown>
  );
};
