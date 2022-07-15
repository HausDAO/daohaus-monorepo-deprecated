import styled, { useTheme } from 'styled-components';
import classNames from 'classnames';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';

import { Link } from '../../atoms';

const SubNavContainer = styled.div`
  width: '100%';
  height: 10rem;
  background-color: ${(props) => props.theme.subNav.bg};

  .nav-link-list {
    padding: 3.2rem 3.5rem 2.2rem 3.5rem;
    a {
      margin-right: 5rem;
    }
  }

  .more-box {
    display: inline-flex;
    align-items: center;

    button {
      background-color: transparent;
      border: none;
      padding: 0;
      margin: 0;
      margin-right: 1rem;
    }
  }
`;

type NavLink = {
  label: string;
  href: string;
};

type SubNavProps = {
  className?: string;
  navLinks?: NavLink[];
  moreLinks?: NavLink[];
};

const NavLink = styled(Link)`
  font-size: 2.4rem;
  letter-spacing: 1.5px;
  color: ${(props) => props.theme.subNav.navLinkColor};
  transition: 0.2s all;
  padding-bottom: 1rem;
  border-bottom: 2px transparent solid;

  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.subNav.navLinkHoverColor};
    text-decoration: none;
  }
  &.selected {
    color: white;
    border-bottom: 2px ${(props) => props.theme.subNav.navLinkColor} solid;
  }
  &.subnav {
    padding-bottom: 1rem;
  }
`;

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
            <NavLink key={link.label} href={link.href} className={classes}>
              {link.label}
            </NavLink>
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
          <NavLink as="button">More</NavLink>
          <RiArrowDownSLine size={'1.6rem'} color={theme.subNav.navLinkColor} />
        </div>
      </div>
    </SubNavContainer>
  );
};
