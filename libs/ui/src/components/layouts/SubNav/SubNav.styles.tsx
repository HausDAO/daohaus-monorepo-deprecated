import styled from 'styled-components';

import { Button } from '../../atoms';

export const SubNavContainer = styled.div`
  width: '100%';
  height: 10rem;
  background-color: ${(props) => props.theme.subNav.bg};

  .nav-link-list {
    padding: 3.2rem 3.5rem 2.2rem 3.5rem;
    a {
      margin-right: 5rem;
    }
  }
  .mobile-box {
    padding: 2.6rem;
  }

  .more-box {
    display: inline-flex;
    align-items: center;

    a {
      margin-right: 1rem;
    }
    svg {
      transform: translateY(-0.5rem);
    }
  }
`;

export const DropdownLink = styled(Button)`
  background-color: transparent;
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
