import { useTheme } from 'styled-components';
import { RiArrowDropDownLine, RiMenuLine } from 'react-icons/ri';
import { Align } from '@radix-ui/popper';
import { useLocation } from 'react-router-dom';

import {
  NavigationTabsContainer,
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

export const NavigationTabs = (props: NavigationTabsProps) => {
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
  return (
    <NavigationTabsContainer className={className}>
      {isSm ? (
        <div className="mobile-box">
          <Button tertiary IconLeft={RiMenuLine}>
            Test
          </Button>
        </div>
      ) : (
        <div className="nav-link-list">
          {/* {navLinks.map((link) => {
            const selected = location.pathname.includes(link.href);
            return (
              <NavLink key={link.label} href={link.href} selected={selected}>
                {link.label}
              </NavLink>
            );
          })}
          {dropdownLinks.length > 0 && (
            <Dropdown
              bg={theme.navTabs.bg}
              align={dropdownMenuAlign}
              spacing={dropdownMenuSpacing}
              trigger={
                <DropdownLink>
                  {dropdownTriggerText}
                  <RiArrowDropDownLine />
                </DropdownLink>
              }
              items={dropdownLinks.map((dropdownLink) => {
                const selected = location.pathname.includes(dropdownLink.href);
                return {
                  type: 'clickable',
                  content: (
                    <NavLink
                      key={dropdownLink.label}
                      href={dropdownLink.href}
                      selected={selected}
                    >
                      {dropdownLink.label}
                    </NavLink>
                  ),
                };
              })}
            />
          )} */}
        </div>
      )}
    </NavigationTabsContainer>
  );
};
