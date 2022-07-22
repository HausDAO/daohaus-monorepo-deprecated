import { useTheme } from 'styled-components';
import { RiArrowDropDownLine, RiMenuLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';

import { SubNavContainer, DropdownLink } from './SubNav.styles';
import { NavLink } from '../../atoms/NavLink/NavLink';
import { useBreakpoint } from '../../../hooks/useMediaQuery';
import { widthQuery } from '../../../theme/global/breakpoints';
import { Button, Dropdown } from '../../atoms';
import { indigoDark } from '@radix-ui/colors';

type NavLinkType = {
  label: string;
  href: string;
};

export type SubNavProps = {
  className?: string;
  navLinks?: NavLinkType[];
  dropdownLinks?: NavLinkType[];
};

export const SubNav = (props: SubNavProps) => {
  const { className, navLinks = [], dropdownLinks = [] } = props;

  const theme = useTheme();
  const location = useLocation();
  const isSm = useBreakpoint(widthQuery.sm);
  return (
    <SubNavContainer className={className}>
      {isSm ? (
        <div className="mobile-box">
          <Button tertiary IconLeft={RiMenuLine}>
            Test
          </Button>
        </div>
      ) : (
        <div className="nav-link-list">
          {navLinks?.map((link) => {
            const selected = location.pathname.includes(link?.href);
            return (
              <NavLink key={link?.label} href={link?.href} selected={selected}>
                {link.label}
              </NavLink>
            );
          })}
          {dropdownLinks.length > 0 && (
            <div className="more-box">
              <Dropdown
                bg={indigoDark.indigo3}
                align="end"
                trigger={
                  <DropdownLink IconRight={RiArrowDropDownLine}>
                    Test
                  </DropdownLink>
                }
                items={[
                  {
                    type: 'clickable',
                    content: (
                      <NavLink href={'/basement/'}>
                        <p>Basement</p>
                      </NavLink>
                    ),
                  },
                  {
                    type: 'clickable',
                    content: (
                      <NavLink href={`/profile/`}>
                        <p>View Profile</p>
                      </NavLink>
                    ),
                  },
                ]}
              />

              {/*REVIEW:
            This dropdown should be built once we are finished the changes
            on the dropdown component.

            ALSO:

            We'll eventually need to develop a pattern to combine static and dynamic
            links for this dropdown. Dynamic Links are not a blocker for
            building the dropdown though
          */}
            </div>
          )}
        </div>
      )}
    </SubNavContainer>
  );
};
