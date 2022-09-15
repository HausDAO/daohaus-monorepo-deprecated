import {
  Dropdown,
  DropdownLink,
  DropdownMenuItem,
  DropdownButton,
  font,
  Theme,
} from '@daohaus/ui';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import styled from 'styled-components';

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

export const ProfileMenuLink = styled(DropdownLink)`
  font-weight: ${font.weight.bold};
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
            <ProfileMenuLink>Delegate</ProfileMenuLink>
          </DropdownMenuItem>
          <DropdownMenuItem key="ragequit" asChild>
            <ProfileMenuLink>Rage Quit</ProfileMenuLink>
          </DropdownMenuItem>
        </>
      )}

      {!isConnectedMember && (
        <>
          <DropdownMenuItem key="delegate" asChild>
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
