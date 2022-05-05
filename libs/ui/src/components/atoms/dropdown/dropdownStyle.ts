import styled from 'styled-components';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

export const DropdownMenu = styled(Dropdown.Root)``;
export const DropdownMenuTrigger = Dropdown.Trigger;
type MenuContentType = {
  bg?: string;
  width?: string;
};
export const DropdownMenuContent = styled(Dropdown.DropdownMenuContent)`
  background-color: ${(props: MenuContentType) => props.bg};
  width: ${(props: MenuContentType) => props.width};
`;
export const DropdownMenuItem = styled(Dropdown.Item)`
  margin-bottom: ${(props: { spacing?: string }) => props.spacing};
  margin-left: ${(props: { spacing?: string }) => props.spacing};
  margin-right: ${(props: { spacing?: string }) => props.spacing};

  :first-child {
    margin-top: ${(props: { spacing?: string }) => props.spacing};
  }
`;
export const DropdownMenuTriggerItem = styled(Dropdown.TriggerItem);
