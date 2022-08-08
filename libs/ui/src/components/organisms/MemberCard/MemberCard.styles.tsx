import styled from 'styled-components';

import { Button, Link } from '../../atoms';

export const MemberCardContainer = styled.div`
  width: '100%';
  height: 10rem;
  background-color: ${(props) => props.theme.navTabs.bg};

  .nav-link-list {
    padding: 3.2rem 3.5rem 2.2rem 3.5rem;
    a {
      margin-right: 5rem;
    }
  }
  .mobile-box {
    padding: 2.6rem;
  }
`;

// TODO Move to Button component as pre defined button style?
export const DropdownLinkTrigger = styled(Button)`
  background-color: transparent;
  border: none;
  border-bottom: 2px transparent solid;
  color: ${(props) => props.theme.navTabs.navLinkColor};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-size: 2.4rem;
  letter-spacing: 1.5px;
  padding-bottom: 1rem;
  transition: 0.2s all;

  svg {
    margin-left: 0.3rem;
  }

  :hover {
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.navTabs.navLinkHoverColor};
    text-decoration: none;
  }

  &.selected {
    background-color: transparent;
    color: white;
    border-bottom: 2px ${(props) => props.theme.navTabs.navLinkColor} solid;
  }
  &.navTabs {
    padding-bottom: 1rem;
  }
`;

export const NavLink = styled(Link)`
  border-bottom: 2px transparent solid;
  color: ${(props) => props.theme.navTabs.navLinkColor};
  cursor: pointer;
  font-size: 2.4rem;
  letter-spacing: 1.5px;
  padding-bottom: 1rem;
  transition: 0.2s all;

  svg {
    margin-left: 0.3rem;
  }

  :hover {
    color: ${(props) => props.theme.navTabs.navLinkHoverColor};
    text-decoration: none;
  }

  &.selected {
    color: white;
    border-bottom: 2px ${(props) => props.theme.navTabs.navLinkColor} solid;
  }

  &.nav-tabs {
    padding-bottom: 1rem;
  }
`;

export const DropdownLink = styled(Link)`
  border-radius: 2px;
  color: ${(props) => props.theme.navTabs.navLinkColor};
  cursor: pointer;
  font-size: 2.4rem;
  letter-spacing: 1.5px;
  padding: 1rem;
  transition: 0.2s all;
  width: 100%;

  svg {
    margin-left: 0.3rem;
  }

  :hover {
    background-color: ${(props) => props.theme.navTabs.hoverNavLinkDropdownBg};
    border-color: ${(props) => props.theme.navTabs.hoverNavLinkDropdownBorder};
    text-decoration: none;
  }

  &.selected {
    background-color: ${(props) => props.theme.navTabs.activeNavLinkDropdownBg};
    border-color: ${(props) => props.theme.navTabs.activeNavLinkDropdownBorder};
    color: ${(props) => props.theme.navTabs.navLinkSelected};
  }
`;
