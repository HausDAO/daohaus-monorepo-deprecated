import styled from 'styled-components';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

export const DropdownMenu = Dropdown.Root;
export const DropdownMenuTrigger = styled(Dropdown.Trigger)``;

type MenuContentType = {
  bg?: string;
  width?: string;
};

export const DropdownMenuContent = styled(Dropdown.DropdownMenuContent)`
  background-color: ${(props: MenuContentType) => props.bg};
  padding: 0.4rem;
  width: ${(props: MenuContentType) => props.width};
`;

export const DropdownMenuItem = styled(Dropdown.Item)`
  margin-bottom: ${(props: { spacing?: string }) => props.spacing};
`;

export const DropdownLabel = styled(Dropdown.Label)`
  display: flex;
  align-items: flex-start;
  padding: 1.2rem;
  min-height: 4.8rem;
`;

// TODO Add Dropdown styles for Checkbox, Radio, and Radio Group
