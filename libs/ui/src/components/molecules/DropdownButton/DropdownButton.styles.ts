import styled from 'styled-components';

import { Button } from '../../atoms/Button';

export const DropdownButtonBase = styled(Button)`
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

  &.sm {
    svg {
      height: 1.8rem;
      width: 1.8rem;
    }
  }

  &.lg {
    svg {
      height: 3.2rem;
      width: 3.2rem;
    }
  }

  svg {
    &.icon-right {
      margin-left: auto;
    }
  }
`;
