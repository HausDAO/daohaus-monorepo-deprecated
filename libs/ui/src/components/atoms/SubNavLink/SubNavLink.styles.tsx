import styled from 'styled-components';

import { Link } from '../Link';

export const StyledNavLink = styled(Link)`
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
