import styled from 'styled-components';

import { DropdownButton } from '../../molecules';

export const AppSwitcherTrigger = styled(DropdownButton)`
  min-width: ${({ minWidth }: { minWidth: string }) => minWidth};
  padding: 0 16px;

  svg.icon-right {
    margin-left: auto;
  }
`;
