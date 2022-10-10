import styled from 'styled-components';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

import { Theme } from '../../../types/theming';
import { Button, Link } from '../../atoms';

export const DropdownMenu = Dropdown.Root;
export const DropdownMenuTrigger = styled(Dropdown.Trigger)``;

type MenuContentType = {
  bgmenu?: string;
  minwidth: string;
  theme: Theme;
};

export const DropdownMenuContent = styled(Dropdown.DropdownMenuContent)`
  background-color: ${(props: MenuContentType) =>
    props.bgmenu ? props.bgmenu : props.theme.dropdown.bgMenu};
  padding: 0.4rem;
  min-width: ${(props: MenuContentType) => props.minwidth};
  z-index: 10;
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

export const DropdownButton = styled(Button)`
  background-color: ${({ theme }: { theme: Theme }) => theme.dropdown.bgItem};
  border: 0.1rem solid ${({ theme }: { theme: Theme }) => theme.dropdown.bgItem};
  color: ${({ theme }: { theme: Theme }) => theme.dropdown.text};

  :hover {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.dropdown.hoverItem};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.dropdown.hoverItem};
  }

  :focus {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.dropdown.focusItem};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.dropdown.focusItem};
  }

  :disabled {
    background-color: ${({ theme }: { theme: Theme }) => theme.dropdown.bgItem};
    border: 0.1rem solid
      ${({ theme }: { theme: Theme }) => theme.dropdown.bgItem};
    color: ${({ theme }: { theme: Theme }) => theme.dropdown.textDisabled};
    cursor: not-allowed;
  }
  &.selected {
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary};
  }
`;

/*
 * TODO Centralize Dropdown Variantes and Base Styles.
 * Base styles for Links, Tabs, Buttons, etc should exists as components in
 * the Dropdown components that can be futhers customized on imports
 * Variants for dropdowns should be in a centralized place and
 */

/*
 * Following are styled as Links
 */

// TODO update colors to be dropdown specific
export const DropdownTriggerLink = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 2px transparent solid;
  color: ${(props) => props.theme.dropdown.text};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
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

// TODO Update theme colors to be dropdown specific
export const DropdownLink = styled(Link)`
  border-radius: 2px;
  color: ${(props) => props.theme.dropdown.text};
  cursor: pointer;
  display: flex;
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

  &.disabled {
    color: ${(props) => props.theme.dropdown.textDisabled};
  }
`;

export const DropdownText = styled.div`
  border-radius: 2px;
  color: ${(props) => props.theme.dropdown.text};
  cursor: pointer;
  display: flex;
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

  &.disabled {
    color: ${(props) => props.theme.dropdown.textDisabled};
  }
`;

// TODO Add Dropdown styles for Checkbox, Radio, and Radio Group
