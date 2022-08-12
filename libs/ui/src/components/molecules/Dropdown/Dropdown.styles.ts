import styled from 'styled-components';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

export const DropdownMenu = Dropdown.Root;
export const DropdownMenuTrigger = styled(Dropdown.Trigger)``;

type MenuContentType = {
  bg: string;
  minwidth: string;
};

export const DropdownMenuContent = styled(Dropdown.DropdownMenuContent)`
  background-color: ${(props: MenuContentType) => props.bg};
  padding: 0.4rem;
  min-width: ${(props: MenuContentType) => props.minwidth};
`;

// Trigger for Dropdown styled as a link/tab
export const DropdownTriggerLink = styled.button`
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
    color: ${(props) => props.theme.navTabs.navLinkHoverColor};
    text-decoration: none;
  }
  &.selected {
    color: white;
    border-bottom: 2px ${(props) => props.theme.navTabs.navLinkColor} solid;
  }
  &.navTabs {
    padding-bottom: 1rem;
  }
`;

export const DropdownMenuItem = styled(Dropdown.Item)`
  margin-bottom: ${(props: { spacing?: string }) => props.spacing};
`;

export const DropdownMenuLabel = styled(Dropdown.Label)`
  display: flex;
  align-items: flex-start;
  padding: 1.2rem;
  min-height: 4.8rem;
`;

// TODO Add Dropdown styles for Checkbox, Radio, and Radio Group
