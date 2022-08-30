import styled from 'styled-components';

import { ButtonV2 } from '../../atoms/ButtonV2';

export const DropdownButtonBase = styled(ButtonV2)`
  &.profile {
    span {
      margin-right: 1rem;
    }

    &.sm {
      span {
        margin-right: 0.8rem;
      }
    }

    &.lg {
      span {
        margin-right: 1.4rem;
      }
    }
  }

  svg {
    &.icon-right {
      margin-left: auto;
    }
  }
`;
