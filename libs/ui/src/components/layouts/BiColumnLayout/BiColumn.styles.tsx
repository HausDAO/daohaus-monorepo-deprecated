import styled from 'styled-components';
import { widthQuery } from '../../../theme/global';

export const BiColumnBox = styled.div`
  margin-top: 5rem;
  width: 100%;
  max-width: 110rem;
  .subtitle {
    margin-bottom: 1.2rem;
    opacity: 0.6;
  }
  .title {
    margin-bottom: 3rem;
  }
  .description {
    margin-bottom: 5rem;
  }
  .split {
    display: flex;
    flex-direction: row;
    gap: 3rem;
    @media ${widthQuery.md} {
      flex-direction: column;
    }
  }
`;
