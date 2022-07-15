import { useTheme } from 'styled-components';
import classNames from 'classnames';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';

import { SubNavContainer } from './SubNav.styles';
import { SubNavLink } from '../../atoms/SubNavLink';

type NavLink = {
  label: string;
  href: string;
};

type SubNavProps = {
  className?: string;
  navLinks?: NavLink[];
  moreLinks?: NavLink[];
};

export const SubNav = (props: SubNavProps) => {
  const {
    className,
    navLinks = [
      { label: 'Home', href: '/home' },
      { label: 'Proposals', href: '/proposals' },
      { label: 'Vaults', href: '/vaults' },
      { label: 'Members', href: '/members' },
    ],
    // moreLinks,
  } = props;

  const theme = useTheme();
  const location = useLocation();

  return (
    <SubNavContainer className={className}>
      <div className="nav-link-list">
        {navLinks?.map((link) => {
          const classes = classNames({
            subnav: true,
            selected: link.href.match(location.pathname),
          });

          return (
            <SubNavLink key={link.label} href={link.href} className={classes}>
              {link.label}
            </SubNavLink>
          );
        })}
        <div className="more-box">
          {/*REVIEW: 
            This dropdown should be built once we are finished the changes
            on the dropdown component. 

            ALSO: 

            We'll eventually need to develop a pattern to combine static and dynamic 
            links for this dropdown. Dynamic Links are not a blocker for 
            building the dropdown though
          */}
          <SubNavLink as="button">More</SubNavLink>
          <RiArrowDownSLine size={'1.6rem'} color={theme.subNav.navLinkColor} />
        </div>
      </div>
    </SubNavContainer>
  );
};
