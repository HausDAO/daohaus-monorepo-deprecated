// COMPONMENT LIBRARY

import styled from 'styled-components';
import { blueDark, redDark, yellowDark } from '@radix-ui/colors';

import { border, ParSm } from '@daohaus/ui';

// TAGS are going to need their own component and system for coloring them
export const Tag = styled(ParSm)`
  display: inline-flex;
  height: fit-content;
  padding: 0.2rem 0.5rem;
  // REVIEW TEMPRORARY COLORS UNTIL WE MAKE TAG SYSTEM
  background-color: ${blueDark.blue3};
  color: ${blueDark.blue11};
  border-radius: ${border.radius};

  &.delegate {
    background-color: ${yellowDark.yellow3};
    color: ${yellowDark.yellow11};
    border-radius: ${border.radius};
  }

  &.network {
    background-color: ${redDark.red3};
    color: ${redDark.red11};
    border-radius: ${border.radius};
  }
`;
