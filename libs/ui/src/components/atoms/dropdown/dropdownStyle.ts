import styled from 'styled-components';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

export const DropdownMenu = Dropdown.Root;
export const DropdownMenuTrigger = Dropdown.Trigger;
export const DropdownMenuContent = styled(Dropdown.DropdownMenuContent)`
  min-width: 25rem;
  background-color: white;
`;
export const DropdownMenuItem = styled(Dropdown.Item)``;
export const DropdownMenuTriggerItem = styled(Dropdown.TriggerItem)`
  /* {
  '&[data-state="open"]': {
    backgroundColor: violet.violet4,
    color: violet.violet11,
  },
  ...itemStyles,
}); */
`;
