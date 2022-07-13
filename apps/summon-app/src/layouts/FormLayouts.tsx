import { widthQuery } from '@daohaus/ui';
import styled from 'styled-components';

export const TextAreaSection = styled.div`
  width: 100%;
  margin-bottom: 3.4rem;
  .link {
    margin-bottom: 2rem;
  }
  .number-display {
    margin-bottom: 2rem;
  }
`;
export const CenterLayout = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  .main-column {
    width: 58rem;
  }
  .title-section {
    margin-bottom: 16rem;
    @media ${widthQuery.sm} {
      margin-bottom: 4rem;
    }
  }
  .top-divider {
    margin-top: 3rem;
    margin-bottom: 2.4rem;
  }
`;

export const BlockImageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 26rem;
  width: 100%;
  margin-bottom: 2.4rem;
  .img-block {
    display: flex;
    height: 12rem;
    width: 12rem;
  }
  img {
    height: 12rem;
    width: 12rem;
  }
`;

export const InfoSection = styled.div`
  p,
  a {
    margin-bottom: 1.6rem;
  }
`;
