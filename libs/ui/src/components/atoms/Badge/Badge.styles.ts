import styled from 'styled-components';

import { blueDark, violetDark, pinkDark, greenDark } from '@radix-ui/colors';

const darkColors = {
  ...blueDark,
  ...violetDark,
  ...pinkDark,
  ...greenDark,
};

export const BaseBadge = styled.div<{
  badgeColor: 'blue' | 'green' | 'pink' | 'violet';
  badgeSize: 'sm' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  background-color: ${({ badgeColor }) => `${darkColors[`${badgeColor}6`]}`};
  border: 1px solid ${({ badgeColor }) => `${darkColors[`${badgeColor}3`]}`};
  border-radius: 2.1rem;
  min-height: ${({ badgeSize }) => {
    return badgeSize === 'sm' ? '2.4rem;' : '3.6rem;';
  }}
  min-width:  ${({ badgeSize }) => {
    return badgeSize === 'sm' ? '5.5rem;' : '8.1rem;';
  }};
  padding: ${({ badgeSize }) => {
    return badgeSize === 'sm' ? '0.3rem 0.8rem;' : '0.6rem 1.6rem;';
  }};

  font-size: ${({ badgeSize }) => (badgeSize === 'sm' ? '1.2rem;' : '1.6rem;')};
  color: ${({ badgeColor }) => `${darkColors[`${badgeColor}12`]}`};

  :hover {
    background-color: ${({ badgeColor }) => `${darkColors[`${badgeColor}7`]}`};
  }

  :focus {
    background-color: ${({ badgeColor }) => `${darkColors[`${badgeColor}6`]}`};
    border: 1px solid ${({ badgeColor }) => `${darkColors[`${badgeColor}8`]}`};
   }

  :disabled {
    background-color: ${({ badgeColor }) => `${darkColors[`${badgeColor}7`]}`};
    color: ${({ badgeColor }) => `${darkColors[`${badgeColor}9`]}`};
   }
`;
