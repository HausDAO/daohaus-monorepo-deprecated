import { useTheme } from 'styled-components';
import { RiArrowDownSLine, RiMenuLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';

import { SubNavContainer } from './SubNav.styles';
import { SubNavLink } from '../../atoms/SubNavLink/SubNavLink';
import { useBreakpoint } from '../../../hooks/useMediaQuery';
import { widthQuery } from '../../../theme/global/breakpoints';
import { Button } from '../../atoms';

type NavLink = {
  label: string;
  href: string;
};

export type SubNavProps = {
  className?: string;
  navLinks?: NavLink[];
  dropdownLinks?: NavLink[];
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
              <SubNavLink
                key={link?.label}
                href={link?.href}
                selected={selected}
              >
                {link.label}
              </SubNavLink>
            );
          })}
          {dropdownLinks.length > 0 && (
            <div className="more-box">
              {/*REVIEW: 
            This dropdown should be built once we are finished the changes
            on the dropdown component. 

            ALSO: 

            We'll eventually need to develop a pattern to combine static and dynamic 
            links for this dropdown. Dynamic Links are not a blocker for 
            building the dropdown though
          */}
              <SubNavLink>More</SubNavLink>
              <RiArrowDownSLine
                size={'2rem'}
                color={theme.subNav.navLinkColor}
              />
            </div>
          )}
        </div>
      )}
    </SubNavContainer>
  );
};
