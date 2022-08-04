import styled from 'styled-components';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

export const DropdownMenu = Dropdown.Root;
export const DropdownMenuTrigger = styled(Dropdown.Trigger)``;
export const DropdownMenuTriggerItem = styled(Dropdown.TriggerItem);

type MenuContentType = {
  bg?: string;
  width?: string;
};

export const DropdownMenuContent = styled(Dropdown.DropdownMenuContent)`
  background-color: ${(props: MenuContentType) => props.bg};
  padding: 1rem;
  width: ${(props: MenuContentType) => props.width};
`;

export const DropdownMenuItem = styled(Dropdown.Item)`
  margin-bottom: ${(props: { spacing?: string }) => props.spacing};

  :last-child {
    margin-bottom: 0;
  }
`;
