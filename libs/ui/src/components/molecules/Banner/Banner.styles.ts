import styled from 'styled-components';

import { Theme } from '../../../types/theming';

export const StyledBanner = styled.div`
  align-items: center;
  display: flex;
  background-color: ${({ theme }: { theme: Theme }) => theme.info};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.info};
  color: ${({ theme }) => theme.fontColor};
  flex-wrap: wrap;
  height: auto;
  justify-content: space-between;
  min-height: 8rem;
  padding: 2rem;
  width: 100%;

  .banner--text-container {
    align-items: center;
    display: flex;

    svg {
      font-size: 2.8rem;
      margin-right: 1.4rem;
    }
  }

  .banner--link-container {
    align-items: center;
    display: flex;

    svg {
      font-size: 2.4rem;
      margin-right: 1rem;
    }
  }

  .banner--link-item {
    margin: 0 6rem;
  }
`;
