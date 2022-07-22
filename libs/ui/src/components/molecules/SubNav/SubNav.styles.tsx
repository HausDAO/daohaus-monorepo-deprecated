import styled from 'styled-components';

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
`;

// TODO Move to Button component as pre defined button style?
export const DropdownLink = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 2px transparent solid;
  color: ${(props) => props.theme.subNav.navLinkColor};
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
