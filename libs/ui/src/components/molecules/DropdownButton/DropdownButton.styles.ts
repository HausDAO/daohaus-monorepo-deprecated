import styled from 'styled-components';

import { Button } from '../../atoms/Button';
import { ProfileAvatar } from '../ProfileAvatar';

export const DropdownButtonBase = styled(Button)`
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

export const DropdownAvatar = styled(ProfileAvatar)`
  margin-right: 1rem;

  &.sm {
    margin-right: 0.8rem;
  }

  &.lg {
    margin-right: 1.4rem;
  }
`;
