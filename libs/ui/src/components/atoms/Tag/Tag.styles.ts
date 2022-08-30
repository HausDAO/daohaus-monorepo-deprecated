import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { border } from '../../../theme/global/border';

// import styled from 'styled-components';
import {
  blueDark,
  violetDark,
  pinkDark,
  greenDark,
  yellowDark,
  redDark,
} from '@radix-ui/colors';

const darkTagColors = {
  ...blueDark,
  ...violetDark,
  ...pinkDark,
  ...greenDark,
  ...yellowDark,
  ...redDark,
};

export const BaseTag = styled.div<{
  tagColor: 'blue' | 'green' | 'pink' | 'violet' | 'yellow' | 'red';
}>`
  display: inline-flex;
  align-items: center;
  background-color: ${({ tagColor }) => `${darkTagColors[`${tagColor}3`]}`};
  border: 1px solid ${({ tagColor }) => `${darkTagColors[`${tagColor}3`]}`};
  border-radius: ${border.radius};
  color: ${({ tagColor }) => `${darkTagColors[`${tagColor}11`]}`};
  min-height: 2.6rem;
  min-width: fit-content;
  padding: 0.2rem 0.5rem;

  :hover {
    background-color: ${({ tagColor }) => `${darkTagColors[`${tagColor}3`]}`};
    border: 1px solid ${({ tagColor }) => `${darkTagColors[`${tagColor}4`]}`};
  }

  :focus {
    background-color: ${({ tagColor }) => `${darkTagColors[`${tagColor}3`]}`};
    border: 1px solid ${({ tagColor }) => `${darkTagColors[`${tagColor}5`]}`};
    outline: none;
  }

  /* We might not need this */
  :disabled {
    background-color: ${({ theme }: { theme: Theme }) => theme.card.disabledBg};
    border: 1px solid
      ${({ theme }: { theme: Theme }) => theme.card.disabledBorder};
    cursor: not-allowed;
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
    color: ${({ tagColor }) => `${darkTagColors[`${tagColor}11`]}`};
  }

  svg.icon-left {
    margin-right: 1rem;
  }

  svg.icon-right {
    margin-left: 0.5rem;
  }
`;
