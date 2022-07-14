import { widthQuery } from '../../../theme/global/breakpoints';
import styled from 'styled-components';

export const OuterLayout = styled.div`
  width: 100%;
  .connect {
    padding: 2.6rem 3rem;
  }
  @media ${widthQuery.sm} {
    .connect {
      padding: 3rem 2rem;
    }
  }
`;
