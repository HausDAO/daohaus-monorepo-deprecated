import { useTheme } from 'styled-components';
import { RiArrowDropDownLine, RiMenuLine } from 'react-icons/ri';
import { Align } from '@radix-ui/react-popper';

import {
  NavigationTabsContainer,
  DropdownLinkTrigger,
  DropdownLink,
  NavLink,
} from './NavigationTabs.styles';
import { useBreakpoint } from '../../../hooks/useMediaQuery';
import { widthQuery } from '../../../theme/global/breakpoints';
import { Button } from '../../atoms';
import { Dropdown } from '../../molecules';

type NavLinkType = {
  label: string;
  href: string;
};

export type NavigationTabsProps = {
  className?: string;
  navLinks?: NavLinkType[];
  pathname: string;
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

const isSelected = (pathname: string, href: string) => pathname === href;

export const NavigationTabs = (props: NavigationTabsProps) => {
  const {
    className,
    navLinks = [],
    dropdownTriggerText = 'More',
    dropdownMenuAlign = 'end',
    dropdownMenuSpacing = '2rem',
    dropdownLinks = [],
    pathname,
  } = props;

  const theme = useTheme();
  const isSm = useBreakpoint(widthQuery.sm);
  const mobileLinks = [...navLinks, ...dropdownLinks];

  return (
    <NavigationTabsContainer className={className}>
      {isSm ? (
        <div className="mobile-box">
          <Dropdown
            menuBg={theme.navTabs.bg}
            align={dropdownMenuAlign}
            spacing={dropdownMenuSpacing}
            trigger={
              <Button tertiary IconLeft={RiMenuLine}>
                Mobile
              </Button>
            }
          >
            {mobileLinks.map((mobileLink) => {
              const selected = isSelected(pathname, mobileLink.href);
              return (
                <DropdownLink
                  key={mobileLink.label}
                  href={mobileLink.href}
                  selected={selected}
                >
                  {mobileLink.label}
                </DropdownLink>
              );
            })}
          </Dropdown>
        </div>
      ) : (
        <div className="nav-link-list">
          {navLinks.map((link) => {
            const selected = isSelected(pathname, link.href);
            return (
              <NavLink key={link.label} href={link.href} selected={selected}>
                {link.label}
              </NavLink>
            );
          })}
          {dropdownLinks.length > 0 && (
            <Dropdown
              modal={false}
              menuBg={theme.navTabs.bg}
              align={dropdownMenuAlign}
              spacing={dropdownMenuSpacing}
              trigger={
                <DropdownLinkTrigger>
                  {dropdownTriggerText}
                  <RiArrowDropDownLine />
                </DropdownLinkTrigger>
              }
            >
              {dropdownLinks.map((dropdownLink, index) => {
                const selected = isSelected(pathname, dropdownLink.href);
                return (
                  <DropdownLink
                    key={`${dropdownLink.label}-${index}`}
                    href={dropdownLink.href}
                    selected={selected}
                  >
                    {dropdownLink.label}
                  </DropdownLink>
                );
              })}
            </Dropdown>
          )}
        </div>
      )}
    </NavigationTabsContainer>
  );
};
