import styled from 'styled-components';

import { ButtonV2 } from '../../atoms/ButtonV2';

export const DropdownButtonBase = styled(ButtonV2)`
  svg {
    width: 2.2rem;
    height: 2.2rem;

    &.icon-left {
      margin-right: 1rem;
    }

    &.icon-right {
      margin-left: auto;
    }
  }
`;
