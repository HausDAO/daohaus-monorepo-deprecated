import styled from 'styled-components';

export const BaseBadge = styled.div<{
  badgeColor: 'blue' | 'green' | 'pink' | 'violet';
  badgeSize: 'sm' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme, badgeColor }) => theme[`${badgeColor}7`]};
  border: 1px solid ${({ theme, badgeColor }) => theme[`${badgeColor}3`]};
  border-radius: 2.1rem;
  justify-content: center;
  min-height: ${({ badgeSize }) => {
    return badgeSize === 'sm' ? '2.4rem;' : '3.6rem;';
  }};
  min-width: ${({ badgeSize }) => {
    return badgeSize === 'sm' ? '3rem;' : '8.1rem;';
  }};
  padding: ${({ badgeSize }) => {
    return badgeSize === 'sm' ? '0.3rem 0.8rem;' : '0.6rem 1.6rem;';
  }};

  font-size: ${({ badgeSize }) => (badgeSize === 'sm' ? '1.2rem;' : '1.6rem;')};
  color: ${({ theme, badgeColor }) => theme[`${badgeColor}12`]};

  /* Disabled hover per comment by Jord */
  /* :hover {
    background-color: ${({ theme, badgeColor }) => theme[`${badgeColor}7`]};
  } */

  :focus {
    background-color: ${({ theme, badgeColor }) => theme[`${badgeColor}6`]};
    border: 1px solid ${({ theme, badgeColor }) => theme[`${badgeColor}8`]};
  }

  :disabled {
    background-color: ${({ theme, badgeColor }) => theme[`${badgeColor}7`]};
    color: ${({ theme, badgeColor }) => theme[`${badgeColor}9`]};
  }
`;
