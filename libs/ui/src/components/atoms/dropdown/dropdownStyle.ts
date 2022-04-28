import styled from 'styled-components';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

export const DropdownMenu = styled(Dropdown.Root)``;
export const DropdownMenuTrigger = Dropdown.Trigger;
export const DropdownMenuContent = styled(Dropdown.DropdownMenuContent)`
  min-width: 25rem;
  background-color: ${(props: { bg: string }) => props.bg};
`;
export const DropdownMenuItem = styled(Dropdown.Item)`
  margin-bottom: ${(props: { spacing: string }) => props.spacing};
  :first-child {
    margin-top: ${(props: { spacing: string }) => props.spacing};
  }
`;
export const DropdownMenuTriggerItem = styled(Dropdown.TriggerItem);

export const DropdownLabel = styled(Dropdown.Label)`
  display: flex;
  align-items: center;
  padding: 1.2rem;
`;
