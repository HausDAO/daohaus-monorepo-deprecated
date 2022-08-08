import { useTheme } from 'styled-components';
import { RiArrowDropDownLine, RiMenuLine } from 'react-icons/ri';
import { Align } from '@radix-ui/popper';
import { useLocation } from 'react-router-dom';

import {
  MemberCardContainer,
  DropdownLinkTrigger,
  DropdownLink,
  NavLink,
} from './MemberCard.styles';
import { Avatar } from '../../atoms';
import { Dropdown, ProfileAvatar } from '../../molecules';
import { useBreakpoint } from '../../../hooks/useMediaQuery';
import { widthQuery } from '../../../theme/global/breakpoints';

type NavLinkType = {
  label: string;
  href: string;
};

export type MemberCardProps = {
  className?: string;
  navLinks?: NavLinkType[];
  dropdownTriggerText?: string;
  dropdownMenuSpacing?: string;
  dropdownMenuAlign?: Align;
  dropdownLinks?: NavLinkType[];
};

/*REVIEW:
  The dropdown could be less dependent on props/chaining
  We can expose components for each item in the dropdown.
  Ex.
        <DropdownMenuLabel />
        <DropdownMenuItem />
        <DropdownMenuCheckbox />

  Allow to be passed as children and the user can loop over items.
  Users could then Pass dynamicly, staticly or both.
*/

export const MemberCard = (props: MemberCardProps) => {
  const {
    className,
    navLinks = [],
    dropdownTriggerText = 'More',
    dropdownMenuAlign = 'end',
    dropdownMenuSpacing = '2rem',
    dropdownLinks = [],
  } = props;

  const theme = useTheme();
  const location = useLocation();
  const isSm = useBreakpoint(widthQuery.sm);
  const mobileLinks = [...navLinks, ...dropdownLinks];

  return (
    <MemberCardContainer className={className}>
      <div className="nav-link-list">
        {dropdownLinks.length > 0 && (
          <Dropdown
            bg={theme.navTabs.bg}
            align={dropdownMenuAlign}
            spacing={dropdownMenuSpacing}
            trigger={
              <DropdownLinkTrigger
                IconLeft={ProfileAvatar}
                IconRight={RiArrowDropDownLine}
              >
                {dropdownTriggerText}
              </DropdownLinkTrigger>
            }
            items={dropdownLinks.map((dropdownLink) => {
              const selected = location.pathname.includes(dropdownLink.href);
              return {
                type: 'clickable',
                content: (
                  <DropdownLink
                    key={dropdownLink.label}
                    href={dropdownLink.href}
                    selected={selected}
                  >
                    {dropdownLink.label}
                  </DropdownLink>
                ),
              };
            })}
          />
        )}
      </div>
    </MemberCardContainer>
  );
};
